import { SignUp } from "@clerk/clerk-react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { FlipWords } from "../components/ui/flip-words";
import { TextHoverEffect } from "../components/ui/text-hover-effect";

const RegisterPage = () => {
  const words = ["stories", "ideas", "knowledge", "feeds", "thoughts"];
  return (
    <div className="text-white flex flex-col md:flex-row items-center justify-center md:justify-between gap-0 md:gap-10 h-[calc(100vh-80px)] m-6">
      <div className="h-auto md:h-[40rem] flex justify-center items-center px-4 text-center md:text-left">
        <div className="text-4xl mx-auto font-normal text-[var(--Accent)]">
          where
          <FlipWords words={words} /> <br />
          take flight — BlogNest
          <TextHoverEffect text="BlogNest" />
        </div>
      </div>
      <div>
        <SignUp signInUrl="login"/>
      </div>
      <BackgroundBeams className="-z-1"/>
    </div>
  )
}

export default RegisterPage