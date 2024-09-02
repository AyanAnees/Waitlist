import * as React from "react";
import {
    Html,
    Body,
    Tailwind,
    Head,
    Font,
    Hr,
    Container,
} from "@react-email/components";
import { Merge } from "lucide-react";

// ? add more props
interface EmailTemplateProps {
    firstName: string;
    lastName: string;
}

export default function EmailTemplate({
    firstName = "User",
    lastName = "",
}: EmailTemplateProps) {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        fontFamily: {
                            poppins: ["Poppins", "Verdana", "sans-serif"],
                        },
                    },
                },
            }}
        >
            <Head>
                <Font
                    fontFamily="Poppins"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Html>
                <Body className="text-slate-800 leading-relaxed md:py-8 bg-slate-100">
                    <Container className="bg-white px-4 md:px-8 pb-4">
                        <div className="flex flex-row items-center gap-2 justify-center">
                            <Merge
                                className="text-[#f97316]"
                                size={32}
                                strokeWidth={3}
                            />
                            <h1 className="text-4xl">contribu.</h1>
                        </div>
                        <Hr />
                        <p className="font-poppins">Welcome {firstName}!</p>
                        <p>
                            Thank you for joining the waitlist for{" "}
                            <span className="font-bold">contribu</span>
                            —your one-stop solution to build your project
                            portfolio!
                        </p>
                        <p>
                            We’re thrilled to have you on board and can't wait
                            to see the amazing projects you'll showcase, the
                            feedback you'll give and receive, and the new
                            collaborations you'll form.
                        </p>
                        <h1 className="text-2xl">What’s Next?</h1>
                        <p>
                            As a member of our early community, you'll be among
                            the first to:
                        </p>
                        <ul className="leading-loose">
                            <li>
                                <span className="font-bold">Discover</span> new
                                projects to work on and contribute to.
                            </li>
                            <li>
                                <span className="font-bold">Connect</span> with
                                other developers who share your passion.
                            </li>
                            <li>
                                <span className="font-bold">Get access</span> to
                                features designed to make collaboration and
                                learning easier and more effective.
                            </li>
                        </ul>
                        <p className="whitespace-pre-line">
                            Stay tuned for more updates! We’ll be sending you an
                            invite soon so you can start innovating, learning,
                            and building with the community.{"\n\n"}In the
                            meantime, feel free to share Contribu with your
                            friends and colleagues who might be interested. The
                            more, the merrier!
                            {"\n\n"}Thank you for being a part of our journey.
                            We can't wait to see what we build together!
                        </p>
                        <p className="whitespace-pre-line">
                            Best regards,{"\n"}The Contribu Team
                        </p>
                    </Container>
                    <p className="text-center text-xs">© 2024 | contribu</p>
                </Body>
            </Html>
        </Tailwind>
    );
}
