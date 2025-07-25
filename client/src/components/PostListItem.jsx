import { Link } from "react-router-dom";
import Imag from "./Imag";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
    return (
        <div className="flex flex-col xl:flex-row gap-6 mb-12">

            {post.img && <div className=" xl:block xl:w-3/3">
                <Imag src={post.img} className="rounded-2xl object-cover" w="710" h="470" />
            </div>}

            <div className="flex flex-col gap-4 xl:w-3/3">
                <Link to={`/${post.slug}`} className="text-4xl font-semibold">
                    {post.title}
                </Link>
                <div className="flex items-center gap-2 text-zinc-700 text-sm">
                    <span>Written by</span>
                    <Link className="text-zinc-200" to={`/id/${post.user?.username}`}>{post.user.username}</Link>
                    <span>on</span>
                    <Link className="text-zinc-200" to={`/posts?cat=${post.category}`}>{post.category}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>
                <p className="line-clamp-3">{post.desc}</p>
                <Link to={`/${post.slug}`} className="underline text-indigo-200 text-sm">Read More</Link>
            </div>
        </div>
    )
}

export default PostListItem