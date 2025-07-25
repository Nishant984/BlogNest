import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { sanitizeInput } from "../lib/validateInput";

const EditIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[var(--secondary)] hover:bg-[var(--secondary2)] rounded-full p-2 flex items-center justify-center transition duration-120 hover:scale-105 ease-in-out hover:text-zinc-100"
  >
    <svg
      className="w-4 h-4 text-muted-foreground"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z"
      />
    </svg>
  </button>
);

const MAX_LENGTH = 120;

const UserBioInline = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [bio, setBio] = useState("");
  const [originalBio, setOriginalBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      const token = await getToken();
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBio(res.data.bio || "");
        setOriginalBio(res.data.bio || "");
      } catch (err) {
        toast.error("Failed to fetch user bio!");
      }
    };

    fetchBio();
  }, [getToken]);

  const saveBio = async () => {
    setLoading(true);
    const token = await getToken();

    const sanitized = sanitizeInput(bio, MAX_LENGTH);
    if (!sanitized) {
      toast.error(
        "Invalid bio. Please remove special characters or keep it under limit."
      );
      setLoading(false);
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/update-bio`,
        { bio: sanitized },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Bio updated!");
      setOriginalBio(sanitized);
      setBio(sanitized);
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update bio.");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setBio(originalBio);
    setEditing(false);
  };

  const remaining = MAX_LENGTH - bio.length;

  return (
    <div className="mt-4">
      {editing ? (
        <div>
          <label className="text-sm font-medium text-[var(--Accent)] mb-1 block">
            Your Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= MAX_LENGTH) setBio(e.target.value);
            }}
            rows={4}
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
            placeholder="Tell the world who you are... (Markdown supported)"
            autoFocus
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 gap-1">
            <span>{remaining} characters left</span>
            <span className="italic">Supports *italic*, **bold**</span>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={saveBio}
              disabled={loading}
              className="text-white px-4 py-1.5 text-sm rounded bg-[var(--Accent2)] hover:bg-[var(--secondary2)] transition duration-150 ease-in-out"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              disabled={loading}
              className=" text-sm px-4 py-1.5 rounded bg-[var(--Accent2)] hover:bg-[var(--secondary2)] transition duration-150 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2 max-w-[300px] pl-8 md:pl-0">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-[var(--Accent3)] mb-1 text-center md:text-start">
              {bio ? "Your Bio" : "Add Bio"}
            </p>
            <div className="text-sm text-muted-foreground prose prose-sm max-w-none">
              <ReactMarkdown>
                {originalBio || "Let others know about you."}
              </ReactMarkdown>
            </div>
          </div>
          <EditIcon onClick={() => setEditing(true)} />
        </div>
      )}
    </div>
  );
};

export default UserBioInline;
