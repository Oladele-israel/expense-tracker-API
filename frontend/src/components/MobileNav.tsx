import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Box,
  Bell,
  PlusSquare,
  AlertOctagon,
  Clipboard,
  LogOut,
  User,
} from "lucide-react";

const sideData = [
  {
    title: "Products",
    icon: <Box />,
    content: [
      {
        desc: "Create Product",
        link: "/dashboard/createProduct",
        icon: <PlusSquare />,
      },
      {
        desc: "Expired Product",
        link: "/dashboard/expiredProduct",
        icon: <AlertOctagon />,
      },
      { desc: "All Entry", link: "/dashboard/allEntry", icon: <Clipboard /> },
    ],
  },
  {
    title: "Notification",
    icon: <Bell />,
    content: [],
  },
];

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSubmenu = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white lg:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <div className="text-lg font-semibold text-center mx-auto lg:mx-0">
        <span className="text-blue-500">LogoX</span>
      </div>
      <User className="w-6 h-6" />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end lg:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        >
          <div
            className="w-3/4 bg-gray-800 h-full p-4 flex flex-col transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMenu}
              className="self-end p-2 mb-4 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-white flex-grow">
              <div
                className="flex items-center gap-2 mb-6 cursor-pointer"
                onClick={toggleMenu}
              >
                <LayoutDashboard className="text-blue-500" />
                <Link to={"/dashboard"} className="text-xl font-semibold ml-4">
                  Dashboard
                </Link>
              </div>

              <div className="space-y-4">
                {sideData.map((item, index) => (
                  <div key={index}>
                    <div
                      className={`flex items-center gap-2 text-lg cursor-pointer p-2 rounded-md transition-all duration-200 ${
                        activeLink === item.title ? "bg-gray-700" : ""
                      } hover:bg-gray-800`}
                      onClick={() => {
                        toggleSubmenu(index);
                        setActiveLink(item.title);
                      }}
                    >
                      {item.icon}
                      <span onClick={toggleMenu}>{item.title}</span>
                    </div>
                    <div
                      className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                        activeIndex === index ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="ml-6 space-y-6 mt-2">
                        {item.content.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-all"
                          >
                            {subItem.icon}
                            <Link to={subItem.link} onClick={toggleMenu}>
                              {subItem.desc}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 p-2 text-red-500 cursor-pointer hover:bg-gray-700 rounded-md">
              <LogOut onClick={toggleMenu} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
