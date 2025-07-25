import { Link } from "react-router-dom";
import Search from "./Search";

const categories = [
  { label: "All Posts", query: "" },
  { label: "Web Design", query: "web-design" },
  { label: "Marketing", query: "marketing" },
  { label: "Development", query: "development" },
  { label: "Productivity", query: "productivity" },
  { label: "Photography", query: "photography" },
  { label: "Internship Stories", query: "internship-stories" },
  { label: "News & Updates", query: "news-updates" },
  { label: "Minimalist", query: "minimalist" },
];

const MainCategories = () => {
  return (
    <div className="sticky top-3 z-[1] bg-[var(--primary)] rounded-3xl xl:rounded-full p-4 shadow-[0_0_6px_rgba(0,0,0,0.5)] shadow-zinc-800 backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="hidden md:flex flex-wrap justify-between gap-3 flex-1">
        {categories.map((cat, index) => (
          <Link
            key={cat.label}
            to={cat.query ? `/posts?cat=${cat.query}` : "/posts"}
            className={`
              hidden
              ${index < 3 ? "sm:inline-block" : ""}
              ${index < 4 ? "lg:inline-block" : ""}
              ${index < 5 ? "xl:inline-block" : ""}
              ${index < 6 ? "3xl:inline-block" : ""}
              hover:bg-[var(--secondary)] text-white rounded-full px-4 py-2 bg-[var(--secondary2)] hover:scale-105 duration-300 whitespace-nowrap
            `}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-center">
        <span className="hidden md:inline-block text-xl font-bold">|</span>
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;
