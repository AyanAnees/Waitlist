import EmailTemplate from "@/emails";
import { Resend } from "resend";
import { NextResponse } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const { firstName, lastName, email } = await req.json();
    // * do validation here
    if (
        !firstName ||
        typeof firstName !== "string" ||
        firstName.trim().length === 0
    ) {
        return NextResponse.json(
            { error: "First name is required" },
            { status: 400 }
        );
    }
    // if (
    //   !lastName ||
    //   typeof lastName !== "string" ||
    //   lastName.trim().length === 0
    // ) {
    //   return NextResponse.json(
    //     { error: "Last name is required" },
    //     { status: 400 }
    //   );
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
        // console.log("invalid email")
        return NextResponse.json(
            { error: "A valid email address is required." },
            { status: 400 }
        );
    }

    const addUserToWaitlist = async (
        firstName: string,
        lastName: string,
        email: string
    ) => {
        const { data, error } = await supabase
            .from("waitlist")
            .insert([
                { first_name: firstName, last_name: lastName, email: email },
            ]);

        if (error && error.code === "23505") {
            // 23505 is the PostgreSQL error code for unique violation
            console.log("Email already exists in the waitlist.");
            return NextResponse.json(
                { error: "Email already exists in the waitlist." },
                { status: 400 }
            );
        } else if (error) {
            console.error("Error adding user to waitlist:", error.message);
        } else {
            console.log("User added to waitlist:", data);
        }
    };

    await addUserToWaitlist(firstName, lastName, email);

    try {
        // * sending the email to the user
        console.log("here");
        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL || "",
            // ! comment the following
            to: [process.env.TO_EMAIL || ""],
            // to: [email],
            // ! Change the subject
            subject: "You're In! Welcome to the Contribu Waitlist!",
            react: EmailTemplate({ firstName: firstName, lastName: lastName }),
        });
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }
        // Responce with the data
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
