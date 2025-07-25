import { useState } from "react"
import PostList from "../components/PostList"
import SideMenu from "../components/SideMenu"

const PostListPage = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="">
      <h1 className="mb-8 text-2xl"></h1>
      <button 
        onClick={()=> setOpen((prev) => !prev)} 
        className="md:hidden bg-[var(--secondary)] hover:bg-[var(--Accent2)] hover:scale-105 duration-200 text-sm text-white px-4 py-2 rounded-2xl mb-4">
        {open? "Close" : "Filter or Search"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <PostList />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block w-full md:w-1/3 lg:w-1/4`}>
          <SideMenu />
        </div>
      </div>
    </div>
  )
}

export default PostListPage
