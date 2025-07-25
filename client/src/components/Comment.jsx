import Imag from "./Imag";
import { format } from "timeago.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { sanitizeInput } from "../lib/validateInput";
import ReactMarkdown from "react-markdown";
import he from "he";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const safeComment = sanitizeInput(comment.desc, 500);
  const decodedComment = he.decode(safeComment || "");

  return (
    <div className="p-4 bg-[var(--secondary)] rounded-xl mb-5">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Imag
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}
        <Link to={`/id/${comment.user?.username}`}>
          {comment.user?.username}
        </Link>
        <span>{format(comment.createdAt)}</span>
        {user && (comment.user.username === user.username || role === "admin") && (
          <span
            className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
            onClick={() => mutation.mutate()}
          >
            delete
            {mutation.isPending && <span>(in progress)</span>}
          </span>
        )}
      </div>
      <div className="mt-4">
         <ReactMarkdown>{decodedComment}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Comment;