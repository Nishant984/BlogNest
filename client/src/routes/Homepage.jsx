import { Link } from "react-router-dom"
import { BackgroundLines } from "../components/ui/background-lines"
import MainCategories from "../components/MainCategories"
import FeaturedPosts from "../components/FeaturedPosts"
import PostList from "../components/PostList"
import Footer from "../components/Footer"

const HomePage = () => {
  return (

    <div className="flex flex-col gap-6">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-[var(--Accent)]">Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}

      <div className="flex items-center justify-center flex-col text-center p-12">
        {/* titles */}
        <div className="flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            BlogNest – Where every word finds its place.
          </h1>
          <p className="mt-4 text-md md:text-xl text-zinc-300">
            A gentle space for unfolding stories and honest words.
          </p>
        </div>
        {/* desktop And large screen animated button */}
        <Link to="write" className="relative mt-6 hidden md:block tracking-wide ">
          <button className="spark-button cursor-pointer">
            <div className="spark"></div>
            <div className="backdrop group-hover:bg-neutral-900"></div>
            <span className="text">Write your story</span>
          </button>

        </Link>
        {/*Mobile only animated button */}
        <Link to="write" className="relative mt-2 block md:hidden ">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text className="fill-white">
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>

          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* CATEGORIES */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-[var(--Accent)]">Recent Posts</h1>
        <PostList />
      </div>

      <BackgroundLines className="absolute inset-0 -z-10" />
      <Footer />
    </div>
  )
}

export default HomePage
