import { generateShareLinks } from "../lib/shareLinks";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Tooltip = ({ text }) => (
  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2px] transition-all duration-200 pointer-events-none z-50">
    {text}
  </div>
);

const SharePost = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const postUrl = `${window.location.origin}/post/${post.slug}`;
  const links = generateShareLinks({ title: post.title, slug: post.slug });

  if (!post || !post._id || !post.slug || !post.title) {
    console.warn("SharePost component received incomplete post data:", post);
    return null;
  }

  const recordShare = async (platform) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}/share`,
        { platform }
      );
    } catch (error) {
      toast.error(`Failed to record ${platform} share.`);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      toast.success("Link copied!");
      recordShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleSocialShare = (platform, url) => () => {
    recordShare(platform);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const IconWrapper = ({ children, label }) => (
    <div className="relative group cursor-pointer">
      {children}
      <Tooltip text={label} />
    </div>
  );

  const TwitterIcon = () => (
    <svg
      className="w-5 h-5 fill-current text-blue-400 hover:text-blue-500"
      viewBox="0 0 24 24"
    >
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      className="w-5 h-5 fill-current text-blue-600 hover:text-blue-700"
      viewBox="0 0 24 24"
    >
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5v5.5h-3v-10h3v1.25c.86-1.28 2.88-1.79 4.25-.91 1.37.88 1.75 2.36 1.75 4.16v5.5z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg
      className="w-5 h-5 fill-current hover:text-red-500"
      viewBox="0 0 22 22"
    >
      <path d="M12 13.5l8-6v-1.5l-8 6-8-6v1.5l8 6zM4 6h16v12h-16v-12z" />
    </svg>
  );

  const CopyIcon = () => (
    <svg
      className="w-5 h-5 text-white hover:text-[var(--Accent4)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );

  const CopiedIcon = () => (
    <svg
      className="w-5 h-5 text-green-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="flex gap-3 mt-6 flex-wrap text-white flex-col">
      <p className="text-sm text-[var(--Accent)]">Share</p>
      <div className="flex flex-row gap-1.5">
        <IconWrapper
          label="Twitter"
          onClick={handleSocialShare("twitter", links.twitter)}
        >
          <a href={links.twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
          </a>
        </IconWrapper>

        <IconWrapper
          label="LinkedIn"
          onClick={handleSocialShare("linkedin", links.linkedin)}
        >
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
        </IconWrapper>

        <IconWrapper
          label="Gmail"
          onClick={handleSocialShare("gmail", links.email)}
        >
          <a href={links.email} target="_blank" rel="noopener noreferrer">
            <EmailIcon />
          </a>
        </IconWrapper>

        <IconWrapper label={copied ? "Copied!" : "Copy"}>
          <button onClick={handleCopy}>
            {" "}
            {copied ? <CopiedIcon /> : <CopyIcon />}
          </button>
        </IconWrapper>
      </div>
    </div>
  );
};

export default SharePost;
