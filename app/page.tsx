"use client";
import Header from "@/components/Header";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Features from "@/components/Features";

export default function Home() {
    const [subscribed, setSubscribed] = useState(false);
    const [showWaitlisted, setShowWaitlisted] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

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

    const handleSubscribe = () => {
        if (!email) {
            setError("Please input a valid email.");
            return;
        }
        if (subscribed) return;

        console.log(email);
        setSubscribed(true);
        setEmail("");
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <div className="relative h-[500px] w-full  overflow-hidden bg-background p-6 sm:p-20 pt-16">
                <div className="flex flex-col items-center justify-start gap-2 z-10">
                    <p className="text-md font-bold text-center w-full text-muted-foreground uppercase">
                        one-stop solution to build your project portfolio
                    </p>
                    <h2 className="pointer-events-none lowercase whitespace-pre-wrap bg-gradient-to-b from-[#F97D26] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-4xl sm:text-5xl font-bold tracking-tight text-transparent w-full sm:max-w-lg pb-8">
                        Innovate Together, Learn Together.
                    </h2>
                    <p className="text-md sm:text-lg text-center text-muted-foreground w-full sm:max-w-lg">
                        Showcase your projects, get feedback, and collaborate
                        with others. Find projects to work on and build projects
                        you care about.
                    </p>
                    <div className="flex flex-col gap-2 pt-6 px-2 sm:max-w-2xl z-10">
                        <Label htmlFor="email" className="font-semibold">
                            Join 1034 others on the waitlist.
                        </Label>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                className="sm:w-60 md:w-96"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button onClick={handleSubscribe}>
                                <motion.div className="flex flex-row items-center justify-center gap-3">
                                    {!showWaitlisted ? (
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
                <Features />
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
