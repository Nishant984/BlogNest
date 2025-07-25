import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Meteors } from "./ui/meteors";
import { motion } from "framer-motion";
import { useMemo } from "react";
import PostListSkeleton from "./skeletons/PostListSkeleton";


const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 3, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  const stickers = useMemo(() => [
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
  ], []);

  const randomSticker = useMemo(() => {
    return stickers[Math.floor(Math.random() * stickers.length)];
  }, [stickers]);

  if (status === "pending") {
    return <PostListSkeleton count={3} />; 
  }

  if (status === "error") {
    return <Navigate to="/not-found" />;
  }

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if (status === "success" && allPosts.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-20 px-4 md:pl-60">
        <div className="relative max-w-xl min-w-[300px] w-full text-center px-10 bg-[var(--secondary3)] rounded-[12px] py-16 z-10 overflow-hidden">
          <div className="absolute inset-0 z-0 hidden md:block">
            <Meteors number={20} />
          </div>
          <div className="relative z-10">

            <h1 className="text-6xl font-bold text-white">404</h1>
            <p className="mt-4 text-xl text-muted-foreground">Oops! Page not found.</p>
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
            <p className="mt-2 text-muted-foreground">
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
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={isFetchingNextPage ? <PostListSkeleton count={1} /> : null}
      endMessage={
        <p className="py-6 text-center text-muted-foreground">
          <b>That’s all for now — check back soon for more!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
