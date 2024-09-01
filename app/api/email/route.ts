import EmailTemplate from "@/emails";
import { Resend } from "resend";
import { NextResponse } from "next/server";

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
  if (
    !lastName ||
    typeof lastName !== "string" ||
    lastName.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "Last name is required" },
      { status: 400 }
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email)) {
    console.log("invalid email")
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }
  // !add to database here

  try {
    // * sending the email to the user
    console.log('here')
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      // ! comment the following
      to: [ process.env.TO_EMAIL,],
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