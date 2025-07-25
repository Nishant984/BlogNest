import { useEffect, useState } from "react";
import Imag from "./Imag";
import { Link } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    useAuth,
    UserButton
} from "@clerk/clerk-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full h-16 md:h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                <span>BlogNest</span>
                <Imag src="BlogNest_LOGO.png" alt="BlogNest Logo" w={32} h={32} className="brightness-0 invert" />
            </Link>
            <div className="md:hidden px-6 z-[9999]">
                <div
                    className="cursor-pointer text-4xl"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? "X" : "≡"}
                </div>
                <div className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 bg-[var(--primary)] transition-all ease-in-out gap-8
                    font-medium text-lg ${open ? "-right-0" : "-right-[100%]"}`}>
                    <Link to="/" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Home</Link>
                    <Link to="/posts" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">All Posts</Link>
                    <Link to="/posts?sort=trending" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Trending</Link>
                    <Link to="/posts?sort=popular" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Most Popular</Link>
                    <Link to="/about" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">About</Link>
                    <Link to="/profile" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Profile</Link>
                    <SignedOut>
                        <Link to="/login">
                            <button className="py-2 px-4 rounded-2xl bg-[var(--secondary)] text-white border-[1px] border-[var(--ring)] cursor-pointer">Login 👋🏻</button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium ">
                <Link to="/" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Home</Link>
                <Link to="/posts?sort=trending" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Trending</Link>
                <Link to="/posts?sort=popular" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Most Popular</Link>
                <Link to="/about" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">About</Link>
                <Link to="/profile" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Profile</Link>
                <SignedOut>
                    <Link to="/login">
                        <button className="py-2 px-4 rounded-2xl bg-[var(--secondary)] text-white border-[1px] border-[var(--ring)] cursor-pointer">Login 👋🏻</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar