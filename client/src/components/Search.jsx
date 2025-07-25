import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { sanitizeInput } from "../lib/validateInput";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleSearch = (query) => {
    if (!query) return;

    const cleaned = sanitizeInput(query.trim(), 100);
    if (!cleaned) return;

    setTimeout(() => {
      if (cleaned.startsWith("@")) {
        const username = cleaned.substring(1);
        navigate(`/id/${username}`);
      } else if (cleaned.startsWith("#")) {
        const author = cleaned.substring(1);
        if (location.pathname === "/posts") {
          setSearchParams({
            ...Object.fromEntries(searchParams),
            author,
          });
        } else {
          navigate(`/posts?author=${author}`);
        }
      } else {
        if (location.pathname === "/posts") {
          setSearchParams({
            ...Object.fromEntries(searchParams),
            search: cleaned,
          });
        } else {
          navigate(`/posts?search=${cleaned}`);
        }
      }
    }, 250);
  };

  return (
    <div className="bg-[var(--secondary2)] hover:bg-[var(--secondary)] rounded-2xl flex items-center gap-2 w-full md:rounded-full">
      <PlaceholdersAndVanishInput
        placeholders={[
          "Search amazing posts...",
          "Type post title...",
          "Find people using @author",
          "Find authors all Post #author",
          "@avishekxd",
        ]}
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.querySelector("input")?.value;
          handleSearch(value);
        }}
        onChange={(e) => {
          const value = e.target.value.trim();
          setSubmitEnabled(value.length > 0);
        }}
      />
    </div>
  );
};

export default Search;
