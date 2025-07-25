import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserBioEditor from "../components/UserBioEditor";
import { Meteors } from "../components/ui/meteors";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import StatCard from "../components/StatCard";
import HeatmapCalendar from "../components/HeatmapCalendar";
import WeeklyStatsChart from "../components/WeeklyStatsChart";
import YearSelector from "../components/YearSelector";
import { parseISO, format, subDays, startOfYear, endOfYear, endOfDay } from "date-fns";
import SkeletonText from "../components/skeletons/SkeletonText";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const UserProfilePage = () => {
  const [section, setSection] = useState("posts");
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostDetails, setSavedPostDetails] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [apiFetchYear, setApiFetchYear] = useState(new Date().getFullYear());

  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const role = user?.publicMetadata?.role;

  useEffect(() => {
    if (!user || !user.publicMetadata?.mongoId) return;

    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedPosts(res.data);

        const postsRes = await Promise.all(
          res.data.map((postId) =>
            axios
              .get(`${import.meta.env.VITE_API_URL}/posts/id/${postId}`)
              .then((r) => r.data)
              .catch(() => null)
          )
        );

        setSavedPostDetails(postsRes.filter(Boolean));
      } catch {
      } finally {
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/user/${user.publicMetadata.mongoId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserPosts(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    const fetchUserComments = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/user/${user.publicMetadata.mongoId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserComments(res.data);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        let startDateParam, endDateParam;
        if (apiFetchYear === new Date().getFullYear()) {
          startDateParam = subDays(new Date(), 365).toISOString();
          endDateParam = endOfDay(new Date()).toISOString();
        } else {
          startDateParam = startOfYear(new Date(apiFetchYear, 0, 1)).toISOString();
          endDateParam = endOfYear(new Date(apiFetchYear, 0, 1)).toISOString();
        }


        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics/overview?userId=${user.publicMetadata.mongoId}&startDate=${startDateParam}&endDate=${endDateParam}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatsData(res.data);
      } catch (err) {
        console.error("Stats error", err);
        toast.error("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    if (section === "comments" ) {
      fetchUserComments();
    } else if (section === "saved") {
      fetchSavedPosts();
    } else if (section === "posts") {
      fetchUserPosts();
    } else if (section === "stats") {
      fetchStats();
    }

  }, [section, getToken, user, apiFetchYear]);

  const handleDelete = async (commentId) => {
    try {
      const token = await getToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Comment deleted");
      setUserComments((prev) => prev.filter((c) => c._id !== commentId));
      await QueryClient.invalidateQueries({ queryKey: ["comments", user.publicMetadata.mongoId] });
    } catch (err) {
      toast.error(err.response?.data || "Failed to delete");
    }
  };

  if (!user) return <div className="text-center py-10">Please log in to view your profile.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-4 mb-8 justify-between bg-[var(--secondary4)] rounded-xl p-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover shadow-md z-10"
          />
          <div className="text-center md:text-left z-10">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <p className="text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
            <p className="text-sm text-muted-foreground">
              Member since: {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <Meteors number={20} className="block md:hidden" />
        <div>
          <UserBioEditor />
        </div>
      </div>

      <div className="relative overflow-hidden flex gap-3 justify-center md:justify-start mb-6 bg-[var(--secondary4)] rounded-xl p-6">
        {[ "posts", "stats", "comments", "saved"].map((item) => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={`px-4.5 py-2 text-sm rounded-md capitalize transition-colors z-10 ${section === item
                ? "bg-neutral-800 text-white"
                : "bg-muted text-muted-foreground hover:bg-[var(--secondary)]"
              }`}
          >
            {item}
          </button>
        ))}
        <Meteors number={20} className="hidden md:block" />
      </div>

      <div className="mt-4 min-h-[200px] rounded-lg bg-muted/40 bg-[var(--secondary4)] rounded-xl p-6">
        {section === "posts" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
              </div>
            ) : userPosts.length === 0 ? (
              <p className="text-muted-foreground">You haven't posted anything yet.</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4 mt-4">
                {userPosts.map((post) => {
                  const previewText = stripHtml(post.summary || post.content || "");
                  const shortPreview =
                    previewText.length > 100 ? previewText.slice(0, 100) + "..." : previewText;

                  return (
                    <li
                      key={post._id}
                      className="p-4 bg-[var(--secondary5)] hover:bg-[var(--secondary2)] rounded-md shadow hover:shadow-md transition cursor-pointer"
                      onClick={() => navigate(`/${post.slug}`)}
                    >
                      <h4 className="font-semibold">{post.title}</h4>
                      <div className="text-sm text-muted-foreground">{shortPreview}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {section === "saved" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Saved Posts</h3>
            {loading ? (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
                <SkeletonText width="100%" height="100px" className="mb-2" />
              </div>
            ) : savedPosts.length === 0 ? (
              <p className="text-muted-foreground">No saved posts yet.</p>
            ) : (
              <ul className="grid md:grid-cols-2 gap-4 mt-4">
                {savedPostDetails.map((post) => {
                  if (!post) return null;
                  const previewText = stripHtml(post.summary || post.content || "");
                  const shortPreview =
                    previewText.length > 100 ? previewText.slice(0, 100) + "..." : previewText;

                  return (
                    <li
                      key={post._id}
                      className="p-4 bg-[var(--secondary5)] hover:bg-[var(--secondary2)] rounded-md shadow hover:shadow-md transition cursor-pointer"
                      onClick={() => navigate(`/${post.slug}`)}
                    >
                      <h4 className="font-semibold">{post.title}</h4>
                      <div className="text-sm text-muted-foreground">{shortPreview}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {section === "comments" && (
          loading ? (
            <ul className="grid gap-4 mt-4">
              <SkeletonText width="100%" height="120px" className="mb-2" />
              <SkeletonText width="100%" height="120px" className="mb-2" />
              <SkeletonText width="100%" height="120px" className="mb-2" />
            </ul>
          ) : userComments.length === 0 ? (
              <p className="text-muted-foreground">You haven't received any comment yet.</p>
          ) : 
          <ul className="grid gap-4 mt-4">
            {userComments.map((comment) => (
              <li
                key={comment._id}
                className="relative p-4 bg-[var(--secondary5)] rounded-md shadow"
              >
                {(comment.user?._id?.toString() === user.publicMetadata.mongoId  || role === "admin") && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="absolute top-2 right-2 text-[var(--Accent4)] hover:text-red-500 transition"
                    aria-label="Delete comment"
                    title="Delete comment"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mt-1 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 0V4a2 2 0 012-2h2a2 2 0 012 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                )}

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

                <p className="text-base mt-2 text-white line-clamp-4 md:line-clamp-3">
                  {(typeof comment.desc === "string" && comment.desc.trim()) || "No comment text found."}
                </p>
              </li>
            ))}
          </ul>
        )}
        {section === "stats" && statsData && (
          <div className="grid gap-2">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-white">Your Statistics</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Total Posts" value={statsData.totalPosts} />
              <StatCard label="Total Comments" value={statsData.totalComments} />
              <StatCard label="Total Views" value={statsData.totalViews} />
              <StatCard label="Post Shares" value={statsData.totalShares} />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Post Activity</h4>
              <HeatmapCalendar data={statsData.calendarData || []} onYearChange={setApiFetchYear} />
            </div>

            {statsData.calendarData && statsData.calendarData.length === 0 && (
              <div className="text-center text-neutral-400 mt-4 p-4 rounded-lg bg-neutral-800">
                {apiFetchYear === new Date().getFullYear() ? (
                  <>
                    <p className="text-lg font-semibold mb-2">No activity recorded yet!</p>
                    <p className="text-sm">Start posting to see your contributions here.</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold mb-2">No activity recorded for {apiFetchYear}.</p>
                    <p className="text-sm">Try selecting a different year in the dropdown.</p>
                  </>
                )}
              </div>
            )}

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Weekly Performance</h4>
              <WeeklyStatsChart data={statsData.weeklyStats || []} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfilePage;