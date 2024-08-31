import React from "react";
import { Merge } from "lucide-react";

const Header = () => {
    return (
        <header className="flex flex-row w-full px-4 sm:px-20 h-20 items-center shadow-inner border-b-[1px] border-primary">
            <div className="flex flex-row items-center gap-2">
                <Merge className="text-primary" size={20} strokeWidth={3} />
                <h1 className="text-2xl font-bold">waitlist.</h1>
            </div>
            <nav className="ml-auto">
                <ul className="flex flex-row gap-6 sm:gap-12 text-muted-foreground">
                    <li>about.</li>
                    <li>features.</li>
                    
                </ul>
            </nav>
        </header>
    );
};

export default Header;
