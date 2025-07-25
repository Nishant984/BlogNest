import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { BackgroundBeams } from "../components/ui/background-beams";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { sanitizeInput } from "../lib/validateInput";
import ReactMarkdown from "react-markdown";
import { Tooltip } from "react-tooltip";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState(null);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [showEmbedPopup, setShowEmbedPopup] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [inputValue, setInputValue] = useState("");

  const MAX_TITLE = 250;
  const MAX_DESC = 500;
  const MAX_CONTENT = 20000;

  const allowedTitleRegex =
    /^[\p{L}\p{N}\p{Emoji_Presentation} .,:!?'"’“”&\-–—\u200d]+$/u;

  const words = [
    { text: "Craft ", className: "text-black dark:text-white/75" },
    { text: "digital ", className: "text-black dark:text-white/75" },
    { text: "stories ", className: "text-black dark:text-white/75" },
    { text: "beautifully ", className: "text-black dark:text-white/75" },
    { text: "with — ", className: "text-black dark:text-white/75" },
    { text: "BlogNest", className: "text-blue-500 dark:text-blue-500" },
  ];

  useEffect(() => {
    if (img?.url) {
      setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
    }
  }, [img]);

  useEffect(() => {
    if (video?.url) {
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`
      );
    }
  }, [video]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setProgress(0), 0);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created!");
      navigate(`/${res.data.slug}`);
    },
  });

  const convertToEmbed = (url) => {
    try {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("v=")
          ? url.split("v=")[1].split("&")[0]
          : url.split("/").pop();
        return `<p><iframe class="ql-video" width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></p>`;
      }
      if (url.includes("vimeo.com")) {
        const videoId = url.split("/").pop();
        return `<p><iframe class="ql-video" width="560" height="315" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen></iframe></p>`;
      }
      toast.error("Invalid video URL");
      return "";
    } catch (err) {
      toast.error("Error parsing video URL");
      return "";
    }
  };

  const tooltipMessage = (
    <>
      Welcome to BlogNest ✨ <br />
      <br />
      Our goal is to build a positive and supportive community where creativity
      shines. <br />
      When you share, please keep it kind and constructive. <br />
      Content that is vulgar, suspicious, or targets others doesn't align with
      our values <br />
      and can take away from the great experience we want for everyone. <br />
      <br />
      Thanks for understanding, <br />- BlogNest Team
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawTitle = formData.get("title")?.trim() || "";
    const rawDesc = formData.get("desc")?.trim() || "";
    const rawContent = value?.trim() || "";

    if (!allowedTitleRegex.test(rawTitle)) {
      toast.error(
        "Title contains invalid characters. Only letters, numbers, emojis, spaces, and hyphens are allowed."
      );
      return;
    }

    if (rawTitle.length < 7) {
      toast.error("Title must be at least 7 characters long.");
      return;
    }

    if (rawTitle.length > MAX_TITLE) {
      toast.error(`Title must be under ${MAX_TITLE} characters.`);
      return;
    }

    if (rawDesc.length > MAX_DESC) {
      toast.error(`Description must be under ${MAX_DESC} characters.`);
      return;
    }

    if (rawContent.length > MAX_CONTENT) {
      toast.error(`Content must be under ${MAX_CONTENT} characters.`);
      return;
    }

    const data = {
      img: cover?.filePath || "",
      title: rawTitle,
      category: formData.get("category"),
      desc: rawDesc,
      content: value,
    };

    mutation.mutate(data);
  };

  if (!isLoaded) return <div className="text-white">Loading...</div>;
  if (isLoaded && !isSignedIn)
    return <div className="text-white">You should login!</div>;

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-4">
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-xl font-light">Create a New Post</h1>
        <span data-tooltip-id="info-tooltip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.75"
            stroke="currentColor"
            className="w-4 h-4 text-gray-400 hover:text-[var(--Accent1)] transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
          </svg>
          <Tooltip
            id="info-tooltip"
            place="top"
            effect="solid"
            content={tooltipMessage}
          />
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 flex-1 mb-6 min-h-0 md:min-h-screen"
      >
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-zinc-300 bg-[var(--secondary)] hover:bg-[var(--Accent2)] cursor-pointer"
          >
            Add a cover image
          </button>
        </Upload>

        <div className="relative w-full">
          <input
            type="text"
            name="title"
            value={inputValue}
            onChange={(e) => {
              const val = e.target.value;
              if (
                val === "" ||
                (allowedTitleRegex.test(val) && val.length <= MAX_TITLE)
              ) {
                setInputValue(val);
              }
            }}
            placeholder=""
            className={`text-2xl font-semibold bg-transparent outline-none w-full z-10 text-lg sm:text-xl md:text-2xl lg:text-[33px] font-bold ${
              inputValue.length > 0 && inputValue.length < 7
                ? "text-red-400"
                : ""
            }`}
          />
          {inputValue === "" && (
            <div className="absolute left-0 top-0 text-3xl font-semibold text-gray-400 pointer-events-none z-0">
              <TypewriterEffectSmooth words={words} />
            </div>
          )}
          {inputValue.length > 0 && inputValue.length < 7 && (
            <div className="text-sm text-red-600 mt-1">
              Title must be at least 7 characters long.
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl shadow-md bg-[var(--secondary)] hover:bg-[var(--Accent2)] cursor-pointer"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="productivity">Productivity</option>
            <option value="photography">Photography</option>
            <option value="marketing">Marketing</option>
            <option value="internship-stories">Internship Stories</option>
            <option value="news-updates">News & Updates</option>
            <option value="minimalist">Minimalist</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-[var(--Accent2)]"
          name="desc"
          placeholder="A Short Description..."
        />

        <div className="flex gap-2 items-start flex-wrap -my-4">
          <Upload type="image" setProgress={setProgress} setData={setImg}>
            <button
              type="button"
              className="flex flex-row justify-center text-[18px] items-center bg-[var(--secondary)] hover:bg-[var(--Accent2)] font-medium rounded-xl p-[3px] cursor-pointer duration-200 hover:scale-105 disabled:bg-zinc-900 disabled:cursor-not-allowed px-4"
            >
              📸<p className="text-sm pt-0.5">Add Image</p>
            </button>
          </Upload>

          <button
            type="button"
            onClick={() => setShowEmbedPopup(true)}
            className="flex flex-row justify-center text-[18px] items-center bg-[var(--secondary)] hover:bg-[var(--Accent2)] font-medium rounded-xl p-[3px] cursor-pointer duration-200 hover:scale-105 px-4"
          >
            🎬 <p className="text-sm pt-0.5">Embed Video</p>
          </button>
        </div>

        <div className="flex flex-1">
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-[var(--Accent2)] shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-[var(--secondary)] hover:bg-[var(--Accent2)] font-medium rounded-xl p-2 cursor-pointer duration-200 hover:scale-105 w-36 disabled:bg-zinc-900 disabled:cursor-not-allowed mb-5"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>

        {progress > 0 && progress < 100 && (
          <div className="fixed top-0 left-0 w-full z-[9999] h-[3px] bg-transparent">
            <div
              className="h-full transition-all duration-300 ease-in-out rounded-r-full"
              style={{
                width: `${progress}%`,
                background: `
                  linear-gradient(
                    90deg,
                    oklch(0.16 0 0),
                    oklch(0.18 0 0),
                    oklch(0.40 0 0),
                    oklch(0.72 0 0),
                    oklch(0.40 0 0),
                    oklch(0.18 0 0),
                    oklch(0.16 0 0)
                  )
                `,
                backgroundSize: "400% 400%",
                animation: "gradientShift 4s linear infinite",
              }}
            />
          </div>
        )}

        {mutation.isError && (
          <span className="text-sm text-red-400">{mutation.error.message}</span>
        )}
      </form>

      {showEmbedPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <BackgroundBeams />
          <div className="bg-[var(--secondary5)] border border-zinc-800 p-6 rounded-xl w-[480px] shadow-2xl text-white space-y-5 z-50">
            <h2 className="text-xl font-semibold tracking-wide flex flex-row gap-2 items-center">
              🎬 Embed a YouTube or Vimeo Video
            </h2>
            <input
              type="text"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              placeholder="https://youtu.be/..."
              className="w-full p-3 rounded-lg bg-[var(--Accent2)] hover:bg-[var(--secondary2)] transition duration-250 text-sm text-white border border-zinc-700 outline-none focus:ring-2 focus:ring-[var(--Accent2)]"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                className="px-5 py-2 rounded-lg bg-[var(--Accent2)] hover:bg-[var(--secondary2)] transition duration-150 ease-in-out text-sm font-medium shadow"
                onClick={() => {
                  const embed = convertToEmbed(videoURL);
                  if (embed) {
                    setValue((prev) => prev + embed);
                    setVideoURL("");
                    setShowEmbedPopup(false);
                  }
                }}
              >
                Embed Video
              </button>
              <button
                className="px-5 py-2 rounded-lg bg-[var(--Accent2)] hover:bg-[var(--secondary2)] transition duration-150 ease-in-out text-sm"
                onClick={() => {
                  setVideoURL("");
                  setShowEmbedPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
