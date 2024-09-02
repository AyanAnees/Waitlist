import EmailTemplate from "@/emails";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email } = await req.json();

        // Validate input
        if (
            !firstName ||
            typeof firstName !== "string" ||
            firstName.trim().length === 0
        ) {
            return NextResponse.json(
                { error: "First name is required." },
                { status: 400 }
            );
        }
        if (
            !email ||
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return NextResponse.json(
                { error: "A valid email address is required." },
                { status: 400 }
            );
        }

        // Check if email already exists
        const { data: existingUser, error: fetchError } = await supabase
            .from("waitlist")
            .select("id")
            .eq("email", email)
            .single();

        if (fetchError) {
            // User does not exist, continue
        }

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists in the waitlist." },
                { status: 400 }
            );
        }

        // Insert new user
        const { data, error: insertError } = await supabase
            .from("waitlist")
            .insert([{ first_name: firstName, last_name: lastName, email }]);

        if (insertError) {
            console.error(
                "Error adding user to waitlist:",
                insertError.message
            );
        }

        // Send email (if required)
        try {
            const { data: emailData, error: emailError } =
                await resend.emails.send({
                    from: process.env.FROM_EMAIL || "",
                    to: [email],
                    subject: "You're In! Welcome to the Contribu Waitlist!",
                    react: EmailTemplate({ firstName, lastName }),
                });

            if (emailError) {
                return NextResponse.json(
                    { error: "Error sending email."},
                    { status: 500 }
                );
            }

            return NextResponse.json({ success: true, data: emailData });
        } catch (error) {
            return NextResponse.json(
                { error: "Error sending confirmation email." },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}