import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { sanitizeInput } from "../lib/validateInput";
import React, { useRef } from 'react';

const SideMenuSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef(null);

  const performSearch = () => {
    const raw = inputRef.current.value.trim();
    const cleaned = sanitizeInput(raw, 100);

    if (!cleaned) return;

    const encoded = encodeURIComponent(cleaned);

    if (cleaned.startsWith("@")) {
      const username = cleaned.substring(1).trim();
      if (username) navigate(`/id/${username}`);
      inputRef.current.value = "";
      return;
    }

    if (cleaned.startsWith("#")) {
      const author = cleaned.substring(1).trim();
      if (!author) return;

      if (location.pathname === "/posts") {
        setSearchParams({
          ...Object.fromEntries(searchParams),
          author,
        });
      } else {
        navigate(`/posts?author=${encodeURIComponent(author)}`);
      }

      inputRef.current.value = "";
      return;
    }

    if (location.pathname === "/posts") {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        search: encoded,
      });
    } else {
      navigate(`/posts?search=${encoded}`);
    }

    inputRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  return (
    <div
      className="bg-[var(--secondary2)] hover:bg-[var(--secondary)] p-2 rounded-full flex items-center gap-2 cursor-pointer"
      onClick={performSearch}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="Search posts or @author"
        className="bg-transparent focus:outline-none focus:ring-0 text-sm w-full"
        onKeyDown={handleKeyPress}
        ref={inputRef}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default SideMenuSearch;