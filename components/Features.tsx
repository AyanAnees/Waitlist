import React from "react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Filter, MessageCircleCode, StickyNote, TvMinimal } from "lucide-react";

const Features = () => {
    const features = [
        {
            Icon: TvMinimal,
            name: "showcase projects.",
            description:
                "Showcase projects: listing them as archived, open to features, or open to collaboration.",
            background: (
                <div className="absolute right-0 top-4 h-[200px] w-[600px] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] border-none opacity-60"></div>
            ),
            cta: "coming soon!",
            className:
                "md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3",
        },
        {
            Icon: StickyNote,
            name: "pitch and find ideas.",
            description:
                "Find projects to start from scratch and find collaborators.",
            background: (
                <div className="absolute right-0 top-4 h-[200px] w-[600px] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] border-none opacity-60"></div>
            ),
            cta: "coming soon!",
            className:
                "md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4",
        },
        {
            Icon: MessageCircleCode,
            name: "collaborate with others.",
            description:
                "Send feedback, request to collaborate, and learn from others.",
            background: (
                <div className="absolute right-0 top-4 h-[200px] w-[600px] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] border-none opacity-60"></div>
            ),
            cta: "coming soon!",
            className:
                "md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2",
        },
        {
            Icon: Filter,
            name: "filter and search.",
            description:
                "Filter using tags, languages, and project types to find your perfect match.",
            background: (
                <div className="absolute right-0 top-4 h-[200px] w-[600px] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] border-none opacity-60"></div>
            ),
            cta: "coming soon!",
            className:
                "md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-4",
        },
    ];
    return (
        <div className="flex justify-center max-w-2xl mt-6 mb-16">
            <BentoGrid className="md:grid-rows-3">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
};

export default Features;
