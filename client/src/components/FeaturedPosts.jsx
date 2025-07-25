import { Link } from "react-router-dom";
import Imag from "./Imag";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) {
    return <div className="text-center text-gray-500 py-10">Loading featured posts...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 py-10">Something went wrong!</div>;
  }

  const posts = data?.posts || [];
  if (posts.length === 0) {
    return <div className="text-center text-gray-500 py-10">No featured posts available.</div>;
  }

  const mainColumnClass = posts.length === 1 ? "w-full" : "lg:w-1/2";
  const sideColumnClass = posts.length >= 2 ? "lg:w-1/2" : "";

  return (
    <div className="lg:mt-18 md:mt-16 flex flex-col lg:flex-row gap-8">
      {posts.length >= 1 && (
        <div className={`w-full ${mainColumnClass} flex flex-col gap-4`}>
          <Link to={`/${posts[0].slug}`}>
            <Imag
              src={posts[0].img}
              className="rounded-3xl object-cover hover:opacity-90 transition"
              w="1280"
              h="850"
            />
          </Link>
          {/* Main Post Details */}
          <div className="flex items-center gap-3 mt-4">
            <h1 className="font-semibold lg:text-lg">01.</h1>
            <div className="text-muted-foreground">
              Written by
              <Link to={`/id/${posts[0].user?.username}`}>
                <span className="text-[var(--Accent3)] pl-3">{posts[0].user?.username || "unknown"}</span>
              </Link>
            </div>
            <div>on</div>
            <Link to={`/posts?cat=${posts[0].category}`} className="text-zinc-700 lg:text-lg">{posts[0].category}</Link>
            <span className="text-gray-500">{format(posts[0].createdAt)}</span>
          </div>

          {/* Main Post Title */}
          <Link
            to={`/${posts[0].slug}`}
            className="text-xl lg:text-3xl font-semibold lg:font-bold"
          >
            {posts[0].title}
          </Link>
        </div>
      )}

      {/* RIGHT: Additional Featured Posts - Only renders if at least two posts exist */}
      {posts.length >= 2 && (
        <div className={`w-full ${sideColumnClass} flex flex-col gap-4 justify-between`}>
          {/* Post 2 */}
          {posts.length >= 2 && (
            <Link to={`/${posts[1].slug}`} className="flex gap-4 lg:h-1/3 justify-between w-full group">
              <Imag
                src={posts[1].img}
                className="rounded-2xl object-cover w-1/3 group-hover:opacity-90 transition"
                w="765"
                h="500"
              />
              <div className="w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
                  <h1 className="font-semibold">02.</h1>
                  <span className="text-zinc-700">{posts[1].category}</span>
                  <span className="text-zinc-500 text-sm">{format(posts[1].createdAt)}</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-lg font-medium">
                  {posts[1].title}
                </h2>
                <p className="line-clamp-2 text-[16px] text-[var(--Accent3)]">{posts[1].desc}</p>
              </div>
            </Link>
          )}

          {/* Post 3 */}
          {posts.length >= 3 && (
            <Link to={`/${posts[2].slug}`} className="flex gap-4 lg:h-1/3 justify-between w-full group">
              <Imag
                src={posts[2].img}
                className="rounded-2xl object-cover w-1/3 group-hover:opacity-90 transition"
                w="765"
                h="500"
              />
              <div className="w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
                  <h1 className="font-semibold">03.</h1>
                  <span className="text-zinc-700">{posts[2].category}</span>
                  <span className="text-zinc-500 text-sm">{format(posts[2].createdAt)}</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-lg font-medium">
                  {posts[2].title}
                </h2>
                <p className="line-clamp-2 text-[16px] text-[var(--Accent3)]">{posts[2].desc}</p>
              </div>
            </Link>
          )}

          {/* Post 4 */}
          {posts.length >= 4 && (
            <Link to={`/${posts[3].slug}`} className="flex gap-4 lg:h-1/3 justify-between w-full group">
              <Imag
                src={posts[3].img}
                className="rounded-2xl object-cover w-1/3 group-hover:opacity-90 transition"
                w="765"
                h="500"
              />
              <div className="w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-2">
                  <h1 className="font-semibold">04.</h1>
                  <span className="text-zinc-700">{posts[3].category}</span>
                  <span className="text-zinc-500 text-sm">{format(posts[3].createdAt)}</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-lg font-medium">
                  {posts[3].title}
                </h2>
                <p className="line-clamp-2 text-[16px] text-[var(--Accent3)]">{posts[3].desc}</p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedPosts;