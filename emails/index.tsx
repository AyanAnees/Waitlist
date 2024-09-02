import * as React from "react";
import {
    Html,
    Body,
    Tailwind,
    Head,
    Font,
    Hr,
    Container,
    Text,
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
                    <Container className="bg-white px-4 md:px-8 pb-4 font-poppins">
                        <div className="flex flex-row items-center gap-2 justify-center">
                            <Merge
                                className="text-[#f97316]"
                                size={32}
                                strokeWidth={3}
                            />
                            <h1 className="text-4xl">contribu.</h1>
                        </div>
                        <Hr />
                        <Text className="text-base">Welcome {firstName}!</Text>
                        <Text className="text-base">
                            Thank you for joining the waitlist for{" "}
                            <span className="text-[#f97316] font-bold">
                                contribu
                            </span>
                            —your one-stop solution to build your project
                            portfolio!
                        </Text>
                        <Text className="text-base">
                            We’re thrilled to have you on board and can't wait
                            to see the amazing projects you'll showcase, the
                            feedback you'll give and receive, and the new
                            collaborations you'll form.
                        </Text>
                        <h1 className="text-2xl">What’s Next?</h1>
                        <Text className="text-base">
                            As a member of our early community, you'll be among
                            the first to:
                        </Text>
                        <ul className="leading-tight">
                            <li>
                                <Text className="text-base">
                                    <span className="font-bold">Discover</span>{" "}
                                    new projects to work on and contribute to.
                                </Text>
                            </li>
                            <li>
                                <Text className="text-base">
                                    <span className="font-bold">Connect</span>{" "}
                                    with other developers who share your
                                    passion.
                                </Text>
                            </li>
                            <li>
                                <Text className="text-base">
                                    <span className="font-bold">
                                        Get access
                                    </span>{" "}
                                    to features designed to make collaboration
                                    and learning easier and more effective.
                                </Text>
                            </li>
                        </ul>
                        <Text className="whitespace-pre-line text-base">
                            Stay tuned for more updates! We’ll be sending you an
                            invite soon so you can start innovating, learning,
                            and building with the community.{"\n\n"}In the
                            meantime, feel free to share Contribu with your
                            friends and colleagues who might be interested. The
                            more, the merrier!
                            {"\n\n"}Thank you for being a part of our journey.
                            We can't wait to see what we build together!
                        </Text>
                        <Text className="whitespace-pre-line text-base">
                            Best regards,{"\n"}The Contribu Team
                        </Text>
                    </Container>
                    <p className="text-center text-xs">
                        contribu. © 2024. All rights reserved.
                    </p>
                </Body>
            </Html>
        </Tailwind>
    );
}
