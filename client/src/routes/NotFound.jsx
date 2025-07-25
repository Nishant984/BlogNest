import { Link } from "react-router-dom";
import { useMemo } from "react";
import { Meteors } from "../components/ui/meteors";
import { motion } from "framer-motion";

const NotFound = () => {
  const stickers = [
    "https://ik.imagekit.io/uj7inhjax/HackerBoy1.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy2.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy3.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy4.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy5.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy6.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy7.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy8.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy9.png",
    "https://ik.imagekit.io/uj7inhjax/HackerBoy10.png",
  ];

  const randomSticker = useMemo(() => {
    return stickers[Math.floor(Math.random() * stickers.length)];
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 sm:px-6 md:px-10">
      <div className="relative w-full max-w-3xl rounded-[12px] bg-[var(--secondary3)] text-center overflow-hidden p-6 sm:p-12 md:p-20 xl:px-40 xl:py-28">
        <div className="absolute inset-0 z-0">
          <Meteors number={20} />
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">404</h1>
          <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
            Oops! Page not found.
          </p>

          {randomSticker && (
            <motion.img
            src={randomSticker}
            width={240}
            height={240}
            alt="Random Sticker"
            className="mx-auto my-4 w-38 h-38"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 8,
                duration: 0.6,
            }}
            />
          )}

          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            We looked everywhere but couldn't find it. 🎈
          </p>

          <Link
            to="/"
            className="mt-6 inline-block px-6 py-2 bg-[var(--secondary2)] hover:bg-[var(--secondary)] text-white rounded-full transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;
