import { useState } from "react";
import Logo from "../components/Logo.jsx";
import { HandCoins, Bitcoin, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const sidenavLinks = [
  {
    icon: HandCoins,
    desc: "Expenses",
    link: "/expense",
  },
  {
    icon: Bitcoin,
    desc: "Budget",
    link: "/budget",
  },

  {
    icon: LogOut,
    desc: "Logout",
  },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[250px] min-h-screen bg-[#ffff] lg:flex flex-col justify-between fixed left-0 top-0 hidden">
        <div>
          <Logo />
          <div className="flex flex-col items-center gap-4 mx-auto">
            {sidenavLinks.slice(0, -1).map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  to={link.link}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-4 w-[225px] justify-center p-5 rounded-full text-[20px] cursor-pointer transition-all ease-in-out duration-300 ${
                    activeIndex === index
                      ? "text-[#551FFF] bg-[#F3F0FF]"
                      : "text-[#D0D2DA] hover:text-[#551FFF] hover:bg-[#F3F0FF]"
                  }`}
                >
                  <Icon />
                  <div>{link.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className="flex items-center gap-4 w-[225px] justify-center p-5 rounded-full text-[20px] cursor-pointer mx-auto mb-4 text-[#D0D2DA] hover:text-[#551FFF] hover:bg-[#F3F0FF]"
          onClick={handleLogout}
        >
          <LogOut />
          <button>Logout</button>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <nav
        className="fixed bottom-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow-lg lg:hidden "
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
        }}
      >
        {sidenavLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center gap-1 transition-all ease-in-out duration-300 ${
                activeIndex === index ? "text-[#551FFF]" : "text-[#D0D2DA]"
              }`}
            >
              <Icon />
              <span className="text-[12px]">{link.desc}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default SideNav;
