"use client";
import Header from "@/components/Header";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronRightIcon, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Features from "@/components/Features";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
    const [subscribed, setSubscribed] = useState(false);
    const [showWaitlisted, setShowWaitlisted] = useState(false);
    const [email, setEmail] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [error, setError] = useState("");
    const [number, setNumber] = useState<number | null>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getWaitlistCount = async () => {
            try {
                const response = await fetch("/api/count");
                const data = await response.json();

                if (response.ok) {
                    setNumber(data.count);
                } else {
                    // console.error("Error fetching waitlist count:", data.error);
                }
            } catch (error) {
                //   console.error("Error fetching waitlist count:", error);
            }
        };

        getWaitlistCount();
    }, []);

    useEffect(() => {
        if (subscribed) {
            setShowWaitlisted(true);

            const timer = setTimeout(() => {
                setShowWaitlisted(false);
                setSubscribed(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [subscribed]);

    const handleSubscribe = async () => {
        // e.preventDefault();
        if (!first || first.trim().length === 0) {
            setError("First name is required.");
            return;
        }
        if (!email) {
            setError("Please input a valid email.");
            return;
        }

        setError("");
        // ! send api request here
        try {
            setLoading(true);
            const res = await fetch("api/email", {
                method: "POST",
                body: JSON.stringify({
                    // ! change the following
                    firstName: first,
                    lastName: last,
                    email: email,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.error || "Unable to join the waitlist. Try again."
                );
                setLoading(false);
                return;
            }

            setLoading(false);

            // console.log("Successful: ", data);
            setSubscribed(true);
            setFirst("");
            setLast("");
            setEmail("");
        } catch (error) {
            // console.log("Error", error);
            setError("Unable to join the waitlist. Try again.");
        }
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <div className="relative h-[550px] w-full  overflow-hidden bg-background p-6 sm:p-20 pt-16">
                <div className="flex flex-col items-center justify-start gap-2 z-10">
                    <p className="text-md font-bold text-center w-full text-muted-foreground uppercase">
                        one-stop solution to build your project portfolio
                    </p>
                    <h2 className="pointer-events-none lowercase whitespace-pre-wrap bg-gradient-to-b from-[#F97D26] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-4xl sm:text-5xl font-bold tracking-tight text-transparent max-w-lg pb-8">
                        Innovate Together, Learn Together.
                    </h2>
                    <p className="text-sm sm:text-lg text-center text-muted-foreground max-w-xl sm:max-w-2xl">
                        Showcase your projects, get feedback, and collaborate
                        with others. Find projects to work on and build projects
                        you care about.
                    </p>
                    <div className="flex flex-col gap-2 pt-6 px-2 sm:max-w-2xl z-10">
                        <Label htmlFor="email" className="font-semibold">
                            Join {number ? `${number}+` : ""} others on the
                            waitlist.
                        </Label>
                        <div className="flex flex-row gap-2 items-center justify-start">
                            <Input
                                id="first"
                                type="text"
                                placeholder="First Name"
                                value={first}
                                onChange={(e) => setFirst(e.target.value)}
                            />
                            <Input
                                id="last"
                                type="text"
                                placeholder="Last Name"
                                value={last}
                                onChange={(e) => setLast(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                className="w-full"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button onClick={handleSubscribe}>
                                <motion.div className="flex flex-row items-center justify-center gap-3">
                                    {loading ? (
                                        <LoaderCircle
                                            size={20}
                                            className="animate-spin"
                                        />
                                    ) : !showWaitlisted ? (
                                        <>
                                            <motion.span whileHover={{ x: -2 }}>
                                                Join
                                            </motion.span>
                                            <motion.div whileHover={{ x: 6 }}>
                                                <ChevronRightIcon size={20} />
                                            </motion.div>
                                        </>
                                    ) : (
                                        <>
                                            <motion.span
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.25,
                                                    ease: "easeInOut",
                                                }}
                                            >
                                                Waitlisted
                                            </motion.span>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <CheckIcon size={20} />
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>
                            </Button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm pl-2 -mt-1">
                                {error}
                            </p>
                        )}
                    </div>
                </div>

                <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                        "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                        "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
                    )}
                />
            </div>

            {/* Features Section */}
            <div
                id="features"
                className="flex flex-col bg-background w-full items-center justify-center mt-20 px-2"
            >
                <h2 className="text-xl font-bold text-center text-primary">
                    features.
                </h2>
                <p className="text-md text-center text-muted-foreground w-full sm:max-w-lg pt-4">
                    contribu is a platform for finding and collaborating on
                    projects. here are some of the features we offer.
                </p>
                <Features />
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-16 bg-background w-full items-center justify-center mt-20 px-4">
                <h2 className="text-xl sm:text-3xl font-bold text-center text-primary">
                    about.
                </h2>
                <p className="text-md text-center sm:text-start text-muted-foreground w-full sm:max-w-xl pt-4">
                    contribu is a platform for students to come together and
                    turn ideas into reality. whether you&apos;re an aspiring
                    entrepreneur, developer, or artist,{" "}
                    <span className="text-primary">contribu</span> connects you
                    with like-minded peers to collaborate on projects and make a
                    difference.
                </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:gap-16 bg-background w-full items-center justify-center mt-20 px-4">
                <p className="text-md text-center sm:text-start text-muted-foreground w-full sm:max-w-xl pt-4">
                    at <span className="text-primary">contribu</span>, our
                    mission is to empower students by providing a collaborative
                    space where ideas flourish and talents are discovered.
                    we&apos;re committed to fostering a culture of innovation
                    and inclusivity, where every voice is heard, and every idea
                    is valued.
                </p>
                <h2 className="text-xl sm:text-3xl font-bold text-center text-primary">
                    mission.
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-16 bg-background w-full items-center justify-center mt-20 mb-16 px-4">
                <h2 className="text-xl sm:text-3xl font-bold text-center text-primary">
                    why join?
                </h2>
                <ul className="list-disc text-md text-start text-muted-foreground w-full sm:max-w-xl pt-4">
                    <li className="ml-4">
                        <span className="text-primary">early access:</span> be
                        among the first to explore and benefit from the
                        platform.
                    </li>
                    <li className="ml-4">
                        <span className="text-primary">
                            build your portfolio:
                        </span>{" "}
                        showcase your projects and build a strong portfolio.
                    </li>
                    <li className="ml-4">
                        <span className="text-primary">collaborate:</span> find
                        projects to work on and collaborate with others.
                    </li>
                    <li className="ml-4">
                        <span className="text-primary">feedback:</span> provide
                        feedback and shape the future of the platform.
                    </li>
                    <li className="ml-4">
                        <span className="text-primary">offers:</span> get
                        exclusive offers and discounts as a waitlist member.
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center justify-center w-full bg-background mt-12 p-6">
                <p className="text-md text-center text-muted-foreground">
                    contribu. © 2024. All rights reserved.
                </p>
            </div>
        </>
    );
}
