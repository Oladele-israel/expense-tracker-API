import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav.jsx";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <SideNav />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
