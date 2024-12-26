import { useState } from "react";
import Logo from "./Logo";
import { UserPen, HandCoins, Bitcoin, Brain, LogOut } from "lucide-react";

const sidenavLinks = [
  {
    icon: UserPen,
    desc: "Profile",
  },
  {
    icon: HandCoins,
    desc: "Expenses",
  },
  {
    icon: Bitcoin,
    desc: "Budget",
  },
  {
    icon: Brain,
    desc: "Insights",
  },
  {
    icon: LogOut,
    desc: "Logout",
  },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <aside className="w-[250px] min-h-screen bg-[#ffff] flex flex-col justify-between fixed left-0 top-0">
      <div>
        <Logo />
        <div className="flex flex-col items-center gap-4 mx-auto">
          {sidenavLinks.slice(0, -1).map((link, index) => {
            const Icon = link.icon;
            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-4 w-[225px] justify-center p-5 rounded-full text-[20px] cursor-pointer ${
                  activeIndex === index
                    ? "text-[#551FFF] bg-[#F3F0FF]"
                    : "text-[#D0D2DA] hover:text-[#551FFF] hover:bg-[#F3F0FF]"
                }`}
              >
                <Icon />
                <div>{link.desc}</div>
              </div>
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
  );
};

export default SideNav;
