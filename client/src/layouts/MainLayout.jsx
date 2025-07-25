import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import ScrollToTop from "../components/ui/scroll-to-top";


const MainLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"]; 

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <div className="text-white px-4 md:mx-4 lg:px-16 lx:px-32 2xl:px-64 ">
        {!shouldHideNavbar && <Navbar />}
        <Outlet/>
        <ScrollToTop />
    </div>
  )
}

export default MainLayout