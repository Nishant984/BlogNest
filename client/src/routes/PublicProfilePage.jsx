import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Meteors } from "../components/ui/meteors";
import ReactMarkdown from "react-markdown";
import { useUser } from "@clerk/clerk-react";
import HeatmapCalendar from "../components/HeatmapCalendar";
import WeeklyStatsChart from "../components/WeeklyStatsChart";
import StatCard from "../components/StatCard";
import SkeletonCircle from "../components/skeletons/SkeletonCircle";
import SkeletonRect from "../components/skeletons/SkeletonRect";
import SkeletonText from "../components/skeletons/SkeletonText";
import {
  subDays,
  endOfDay,
  startOfYear,
  endOfYear,
} from "date-fns";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const PublicProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user: clerkUser } = useUser();

  const [userData, setUserData] = useState(null);
  const [section, setSection] = useState("stats"); 
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [apiFetchYear, setApiFetchYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  const isSelf = clerkUser?.username === username;

  useEffect(() => {
    const fetchUser = async () => {
      if (isSelf) {
        navigate("/profile");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/username/${username}`);
        setUserData(res.data);

        const postRes = await axios.get(`${import.meta.env.VITE_API_URL}/posts/user/${res.data._id}`);
        setUserPosts(postRes.data);

        const commentRes = await axios.get(`${import.meta.env.VITE_API_URL}/comments/user/${res.data._id}`);
        setUserComments(commentRes.data);
      } catch (err) {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, navigate, isSelf]);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchStats = async () => {
      try {
        const currentYear = new Date().getFullYear();
        let startDateParam, endDateParam;

        if (apiFetchYear === currentYear) {
          startDateParam = subDays(new Date(), 365).toISOString();
          endDateParam = endOfDay(new Date()).toISOString();
        } else {
          startDateParam = startOfYear(new Date(apiFetchYear, 0, 1)).toISOString();
          endDateParam = endOfYear(new Date(apiFetchYear, 0, 1)).toISOString();
        }

        const statsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics/overview?userId=${userData._id}&startDate=${startDateParam}&endDate=${endDateParam}`
        );

        setStatsData(statsRes.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [apiFetchYear, userData?._id]);

  if (!loading && !userData) {
    return (
      <div className="text-center py-10 bg-[var(--secondary5)] rounded-md max-w-4xl mx-auto px-4 flex justify-center items-center">
        <div>Profile not found.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-4 mb-8 justify-between bg-[var(--secondary4)] rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-4 items-center w-full">
            <div className="shrink-0 self-center md:self-center">
              <SkeletonCircle size="96px" />
            </div>
            <div className="text-center md:text-left w-full">
              <SkeletonText width="40%" height="20px" className="mb-1 mx-auto md:mx-0" />
              <SkeletonText width="50%" height="16px" className="mx-auto md:mx-0" />
            </div>
          </div>

          <div className="w-full md:w-[320px] text-center md:text-right">
            <SkeletonText width="30%" height="16px" className="mb-2 mx-auto md:ml-auto md:mr-0" />
            <SkeletonText width="100%" height="60px" className="mb-2" />
          </div>
        </div>

        <div className="relative overflow-hidden flex gap-3 justify-center md:justify-start mb-6 bg-[var(--secondary4)] rounded-xl p-6">
          <SkeletonText width="80px" height="36px" className="mr-2" />
          <SkeletonText width="80px" height="36px" className="mr-2" />
          <SkeletonText width="80px" height="36px" />
        </div>

        <div className="min-h-[200px] rounded-xl bg-[var(--secondary4)] p-6">
          <SkeletonText width="70%" height="24px" className="mb-4" />
          <div className="grid md:grid-cols-2 gap-4">
            <SkeletonRect width="100%" height="100px" className="mb-2" />
            <SkeletonRect width="100%" height="100px" className="mb-2" />
            <SkeletonRect width="100%" height="100px" className="mb-2" />
            <SkeletonRect width="100%" height="100px" className="mb-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-4 mb-8 justify-between bg-[var(--secondary4)] rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img
            src={userData.img || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover shadow-md z-10"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
          <div className="text-center md:text-left z-10">
            <h2 className="text-2xl font-semibold">
              {userData.username}
              {isSelf && (
                <span className="text-xs text-green-400 ml-2 font-normal">(You)</span>
              )}
            </h2>
            {userData.email && (
              <p className="text-muted-foreground">{userData.email}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Member since: {new Date(userData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Meteors number={20} className="block md:hidden" />

        <div className="z-10 mb-2">
          <label className="text-sm font-medium text-[var(--Accent3)] mb-1 block text-center md:text-start">
            Bio
          </label>
          <div className="p-4 md:p-0 max-w-[320px] bg-[var(--secondary5)] md:bg-[var(--secondary4)] transition ease-in-out rounded-md text-muted-foreground whitespace-pre-wrap text-sm prose prose-invert">
            <ReactMarkdown>
              {userData.bio?.trim() ? userData.bio : "No bio available."}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden flex gap-3 justify-center md:justify-start mb-6 bg-[var(--secondary4)] rounded-xl p-6">
        {["stats", "posts", "comments"].map((item) => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={`px-4 py-2 text-sm rounded-md capitalize transition-colors z-10 ${
              section === item
                ? "bg-neutral-800 text-white"
                : "bg-muted text-muted-foreground hover:bg-[var(--secondary)]"
            }`}
          >
            {item}
          </button>
        ))}
        <Meteors number={20} className="hidden md:block" />
      </div>

      <div className="min-h-[200px] rounded-xl bg-[var(--secondary4)] p-6">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-md bg-[var(--secondary5)] space-y-2 animate-pulse"
              >
                <SkeletonRect width="80%" height="1.2rem" />
                <SkeletonText width="100%" height="0.9rem" />
                <SkeletonText width="95%" height="0.9rem" />
              </div>
            ))}
          </div>
        ) : section === "posts" ? (
          <>
            <h3 className="text-xl font-semibold mb-2">Posts by {userData.username}</h3>
            {userPosts.length === 0 ? (
              <p className="text-muted-foreground">No posts yet.</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4 mt-4">
                {userPosts.map((post) => {
                  const previewText = stripHtml(post.summary || post.content || "");
                  const shortPreview =
                    previewText.length > 100 ? previewText.slice(0, 100) + "..." : previewText;

                  return (
                    <li
                      key={post._id}
                      onClick={() => navigate(`/${post.slug}`)}
                      className="p-4 bg-[var(--secondary5)] rounded-md shadow hover:bg-[var(--secondary2)] cursor-pointer"
                    >
                      <h4 className="font-semibold">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">{shortPreview}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        ) : section === "comments" ? (
          <>
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {userComments.length === 0 ? (
              <p className="text-muted-foreground">No comments yet.</p>
            ) : (
              <ul className="grid gap-4 mt-4">
                {userComments.map((comment) => (
                  <li
                    key={comment._id}
                    className="p-4 bg-[var(--secondary5)] rounded-md shadow hover:shadow-md"
                  >
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {comment.post && (
                      <p
                        onClick={() => navigate(`/${comment.post.slug}`)}
                        className="text-sm font-semibold text-blue-400 cursor-pointer hover:underline"
                      >
                        Commented on: {comment.post.title}
                      </p>
                    )}
                    <p className="text-base mt-2 text-white">
                      {(typeof comment.desc === "string" && comment.desc.trim()) || "No comment found"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : section === "stats" && statsData ? (
          <>
            <div>
              <h4 className="text-lg font-semibold mb-2">{userData.username}'s Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Posts" value={statsData.totalPosts} />
                <StatCard label="Total Comments" value={statsData.totalComments} />
                <StatCard label="Total Views" value={statsData.totalViews} />
                <StatCard label="Post Shares" value={statsData.totalShares} />
              </div>
            </div>

            <HeatmapCalendar data={statsData.calendarData || []} onYearChange={setApiFetchYear} />

            {statsData.calendarData && statsData.calendarData.length === 0 && (
              <div className="text-center text-neutral-400 mt-4 p-4 rounded-lg bg-neutral-800">
                <p className="text-lg font-semibold mb-2">
                  No activity recorded for {apiFetchYear}.
                </p>
                <p className="text-sm">Try selecting a different year in the dropdown.</p>
              </div>
            )}

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Weekly Performance</h4>
              <WeeklyStatsChart data={statsData.weeklyStats || []} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PublicProfilePage;
