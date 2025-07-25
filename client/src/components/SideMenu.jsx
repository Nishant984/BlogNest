import { Link, useSearchParams } from "react-router-dom"
import SideMenuSearch from "./SideMenuSearch";

const SideMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilterChange = (e) => {
        if (searchParams.get("sort") !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value,
            });
        }
        const selected = e.target.value;
        const current = searchParams.get("sort");

        const newParams = new URLSearchParams(searchParams);

        if (current === selected) {
            newParams.delete("sort");
        } else {
            newParams.set("sort", selected);
        }

        setSearchParams(newParams);
    };

    const handleCategoryChange = (category) => {
        if (searchParams.get("cat") !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat:category,
            });
        }
    };

    return (
    <div className="px-4 h-max sticky top-8 w-full md:w-44 lg:w-62">
        <h1 className="mb-4 text-sm font-medium">Search</h1> 
        <SideMenuSearch/>
        <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
        <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    onChange={handleFilterChange} 
                    value="newest" 
                    checked={searchParams.get("sort") === "newest"}
                className="appearance-none w-4 h-4 border-[1.5px] border-zinc-50 cursor-pointer rounded-sm bg-[var(--secondary2)] checked:bg-neutral-100"/>
                Newest
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    onChange={handleFilterChange} 
                    value="popular" 
                    checked={searchParams.get("sort") === "popular"}
                className="appearance-none w-4 h-4 border-[1.5px] border-zinc-50 cursor-pointer rounded-sm bg-[var(--secondary2)] checked:bg-neutral-100"/>
                Most Popular
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    onChange={handleFilterChange} 
                    value="trending" 
                    checked={searchParams.get("sort") === "trending"}
                className="appearance-none w-4 h-4 border-[1.5px] border-zinc-50 cursor-pointer rounded-sm bg-[var(--secondary2)] checked:bg-neutral-100"/>
                Trending
            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    onChange={handleFilterChange} 
                    value="oldest" 
                    checked={searchParams.get("sort") === "oldest"}
                className="appearance-none w-4 h-4 border-[1.5px] border-zinc-50 cursor-pointer rounded-sm bg-[var(--secondary2)] checked:bg-neutral-100"/>
                Oldest
            </label>
        </div>
        <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>    
        <div className="flex flex-col gap-2 text-sm">
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("general")}>All</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("web-design")}>Web Design</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("development")}>Development</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("productivity")}>Productivity</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("marketing")}>Marketing</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("photography")}>Photography</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("internship-stories")}>Internship stories</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("minimalist")}>Minimalist</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("news-updates")}>News & Updates</span>
      </div>    
    </div>
  )
}

export default SideMenu