import Imag from "../components/Imag";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import SideMenuSearch from "../components/SideMenuSearch";
import { toast } from "react-toastify";
import SinglePostPageSkeleton from "../components/skeletons/SinglePostPageSkeleton";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();


  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    const increaseViews = async () => {
       if (data?._id && !isPending && !error) {
        try {
          await axios.put(`${import.meta.env.VITE_API_URL}/posts/view/${data._id}`);
        } catch (err) {
          toast.error("Failed to increase views!");
        }
      }
    };
    increaseViews();
  }, [data?._id, isPending, error]);

  if (isPending) {
    return <SinglePostPageSkeleton />;
  }
  if (error) return "Something went wrong: " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{data.title}</h1>
          <div className="flex items-center gap-2 text-[var(--Accent)] text-sm">
            <span>Written by</span>
            <Link className="text-indigo-300" to={`/posts?author=${data.user.username}`}>{data.user.username}</Link>
            <span>on</span>
            <Link className="text-zinc-200 hover:text-zinc-400 transition duration-200 ease-in-out" to={`/posts?cat=${data.category}`}>{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <div className="flex items-start flex-col gap-8 text-sm text-zinc-300 mt-2 ">
            <span className="bg-zinc-800 rounded-full px-3 py-1">
              📈 {data.visit || 0} views
            </span>
            {data.img && (
              <div className="block lg:hidden w-3/5">
                <Imag src={data.img} w="800" h="500" className="rounded-2xl" />
              </div>
            )}
          </div>

          <p className="text-[var(--Accent)] font-medium">{data.desc}</p>
        </div>

        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Imag src={data.img} w="800" h="500" className="rounded-2xl" />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="lg:text:lg flex flex-col gap-6 text-justify">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Imag src={data.user.img} className="w-12 h-12 rounded-full object-cover" w="48" h="48" />
              )}
              <Link className="text-indigo-300" to={`/id/${data.user.username}`}>{data.user.username}</Link>
            </div>
            <p className="text-sm text-zinc-200">Bringing you thoughtful articles and personal experiences.</p>
            <div className="flex gap-2">
              <Link><Imag src="facebook.svg" w="24" /></Link>
              <Link><Imag src="instagram.svg" w="24" /></Link>
            </div>
          </div>

          <PostMenuActions post={data} />

          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/posts">All</Link>
            <Link className="underline" to="/posts?cat=web-design">Web Design</Link>
            <Link className="underline" to="/posts?cat=Development">Development</Link>
            <Link className="underline" to="/posts?cat=productivity">Productivity</Link>
            <Link className="underline" to="/posts?cat=internship-stories">Internship Stories</Link>
            <Link className="underline" to="/posts?cat=marketing">Marketing</Link>
            <Link className="underline" to="/posts?cat=minimalist">Minimalist</Link>
            <Link className="underline" to="/posts?cat=photography">Photography</Link>

          </div>

          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <SideMenuSearch />
        </div>
      </div>

      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
