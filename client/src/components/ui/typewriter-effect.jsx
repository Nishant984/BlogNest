"use client";

import { cn } from "../../lib/utils";
import { motion } from "motion/react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      wordsArray.flatMap((word, wordIdx) =>
        word.text.map((char, charIdx) => (
          <span
            key={`word-${wordIdx}-char-${charIdx}`} 
            className={cn(`dark:text-white text-black `, word.className)}>
            {char}
          </span>
        ))
      )
    );
  };

  return (
    <div className={cn("flex space-x-1 mt-1", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2, 
          ease: "linear",
          delay: 1,
        }}>
        <div
          className="text-base  sm:text-base md:text-2xl lg:text:2xl xl:text-3xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}>
          {renderWords()}{""} 
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[3px] h-4 sm:h-7 xl:h-9 bg-blue-500",
          cursorClassName
        )}></motion.span>
    </div>
  );
};