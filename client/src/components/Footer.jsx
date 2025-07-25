import React from 'react'
import Imag from './Imag'
import { Link } from 'react-router-dom'
import { FlipWords } from './ui/flip-words'

const Footer = () => {
    const words = [
        "You’ve reached the end! Time for a coffee?",
        "All done! Time to relax and scroll back up.",
        "You scrolled faster than a cat chasing a laser!",
    ];
    return (
        <footer className="bg-[var(--secondary3)] rounded-xl mb-12">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
                        <span>BlogNest</span>
                        <Imag src="BlogNest_LOGO.png" alt="BlogNest Logo" w={32} h={32} className="brightness-0 invert" />
                    </Link>
                </div>

                <div className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
                    <FlipWords words={words} />
                </div>

                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    <li>
                        <Link to="/about" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">About</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Profile</Link>
                    </li>
                    <li>
                        <Link to="/write" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Write your story</Link>
                    </li>
                    <li>
                        <Link to="/posts" className="transition duration-100 hover:ease-in hover:text-[var(--Accent4)]">Blogs</Link>
                    </li>
                </ul>

                <ul className="mt-12 flex justify-center items-center gap-3 md:gap-3">
                    <li>
                        <div className="flex items-center text-[16px] text-muted-foreground gap-1">
                            Crafted with
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 23 23"
                                width="18"
                                height="18"
                                className="mx-1"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                    C13.09 3.81 14.76 3 16.5 3 
                                    19.58 3 22 5.42 22 8.5 
                                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="0"
                                    className="hover:fill-red-600 transition-all ease-in"
                                />
                            </svg>
                            by the <span className="font-semibold ml-1">BlogNest Team</span>
                        </div>
                    </li>
                    <li>
                        <a
                            href="https://github.com/AvishekxD"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                        >
                            <span className="sr-only">GitHub</span>

                            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer