import { useState } from "react";
import Logo from "../components/Logo.jsx";
import { UserPen, HandCoins, Bitcoin, Brain, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const sidenavLinks = [
  {
    icon: UserPen,
    desc: "Profile",
    link: "/profile",
  },
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
    icon: Brain,
    desc: "Insights",
    link: "/insights",
  },
  {
    icon: LogOut,
    desc: "Logout",
  },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[250px] min-h-screen bg-[#ffff] md:flex flex-col justify-between fixed left-0 top-0 hidden">
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
          onClick={() => setActiveIndex(sidenavLinks.length - 1)}
        >
          <LogOut />
          <div>Logout</div>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <nav
        className="fixed bottom-0 left-0 w-full flex justify-between items-center px-6 py-4 shadow-lg md:hidden "
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
