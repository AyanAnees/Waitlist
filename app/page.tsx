"use client";
import Header from "@/components/Header";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

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
            <div className="relative h-[500px] w-full  overflow-hidden bg-background p-20 pt-16">
                <div className="flex flex-col items-center justify-start gap-2 z-10">
                    <p className="text-md font-bold text-center text-muted-foreground uppercase">
                        one-stop solution to build your project portfolio
                    </p>
                    <h2 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#F97D26] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent max-w-lg pb-4">
                        Innovate Together, Learn Together.
                    </h2>
                    <p className="text-lg text-center text-muted-foreground max-w-lg">
                        Showcase your projects, get feedback, and collaborate
                        with others. Find projects to work on and build projects
                        you care about.
                    </p>
                    <div className="flex flex-col gap-2 pt-6 px-2 max-w-lg z-10">
                        <Label htmlFor="email" className="font-semibold">
                            Join 1034 others on the waitlist.
                        </Label>
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-96"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button onClick={handleSubscribe}>
                                <motion.div className="flex flex-row items-center justify-center gap-3">
                                    {!showWaitlisted ? (
                                        <>
                                            <motion.span whileHover={{ x: -2 }}>
                                                Join Waitlist
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
                            <p className="text-red-500 text-sm pl-2 -mt-1">{error}</p>
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
        </>
    );
}
