
const About = () => {
  return (
    <div className="px-6 py-10 text-white flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-8">About — BlogNest</h1>
      <p className="text-lg leading-relaxed max-w-3xl flex text-center">
        BlogNest is a creative blogging platform where stories, ideas, and knowledge take flight. 
        Built with modern web tech like React, Clerk, MongoDB, Express and TailwindCSS, our mission is to empower people to share their voices.
      </p>
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
  );
};

export default About;
