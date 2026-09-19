import React, { useEffect, useRef, useState } from "react";
import { InteractiveHoverButton } from "./interactive-hover-button";
import { LeafyGreen } from "lucide-react";
import { Menu, X, Settings, LogOut, BriefcaseBusiness } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { name: "Find Work", link: "/find-work" },
    { name: "Hire People", link: "/collections" },
    { name: "Why Shohojogi", link: "/why-shohojogi" },
    { name: "ProductPage (demo)", link: "/product" },
    { name: "taskPage (demo)", link: "/task" },
    { name: "Admin", link: "/admin" },
  ];
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // Close account dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/${user.role}/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 z-50  w-full max-h-1/9 bg-white">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-10">
        <div>
          <img
            className="flex h-7 sm:h-8 w-auto m-4 cursor-pointer"
            src="src/assets/icons/banner.svg"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div className="hidden md:flex ml-auto items-center gap-3">
          <ul className="flex gap-4 lg:gap-5">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer font-light hover:text-green-700 p-0.5 group relative"
              >
                <NavLink to={item.link}>
                  {item.name}

                  <span
                    className="
                absolute left-1/2 -bottom-1 h-1 w-full -translate-x-1/2
                scale-x-0 bg-green-700 opacity-0 origin-center transition-all duration-500 ease-out
                group-hover:scale-x-50
                group-hover:opacity-100 rounded-full
                "
                  ></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {user ? (
            <div ref={accountRef} className="relative">
              {/* Account circle */}
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full
  bg-gradient-to-br from-green-600 to-green-800 outline-1 outline-green-400/40 border-green-400/70
  text-white font-semibold text-lg transition duration-200 hover:brightness-90
  "
                title={user.name}
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {accountOpen && (
                <div className="absolute -right-3 top-[52px] w-56">
                  {/* Arrow */}
                  <div
                    className="
        absolute
        -top-[6px]
        right-[26px]
        z-30
        h-3
        w-3
        rotate-45
        border-l
        border-t
        border-gray-200
        bg-white
      "
                  />

                  {/* Flyout — clips the glow */}
                  <div
                    className="
        relative
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-white
        p-2
        shadow-lg
      "
                  >
                    {/* Bottom-right glow */}
                    <div
                      className="
          pointer-events-none
          absolute
          -bottom-16
          -right-14
          h-36
          w-36
          rounded-full
          bg-green-500/25
          blur-3xl
        "
                    />
                    {/* User info */}
                    <div className="border-b border-gray-100 px-3 py-2 mb-1">
                      <p className="text-xs text-gray-500">Signed in as</p>

                      <p className="font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                    </div>
                    {/* Post — workers only */}
                    {user.role === "client" && (
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          navigate("/post-task");
                        }}
                        className="flex w-full items-center gap-3 rounded-xl 
               px-3 py-2.5 text-sm text-gray-700 
               hover:bg-gray-100 transition"
                      >
                        <BriefcaseBusiness size={18} />
                        <span>Create Listing</span>
                      </button>
                    )}

                    {/* Settings */}
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        // navigate("/settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl
                       px-3 py-2.5 text-sm text-gray-700
                       hover:bg-gray-100 transition"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl
                       px-3 py-2.5 text-sm text-red-600
                       hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <InteractiveHoverButton
              className="border-2 border-green-500"
              onClick={() => navigate("/join")}
            >
              Join Now
            </InteractiveHoverButton>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition"
        >
          {menuOpen ? (
            <X size={28} color="green" />
          ) : (
            <Menu size={28} color="green" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-5 shadow-md">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer font-quicksand font-light hover:text-green-700 p-0.5 group relative"
                onClick={() => setMenuOpen(false)}
              >
                <NavLink to={link.link}>{link.name}</NavLink>
              </li>
            ))}
          </ul>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-light">Hi, {user.name}</span>
              <InteractiveHoverButton
                className="border-2 border-green-500"
                onClick={handleLogout}
              >
                Log out
              </InteractiveHoverButton>
            </div>
          ) : (
            <InteractiveHoverButton
              className={"border-2 border-green-800"}
              onClick={() => {
                navigate("/join");
                setMenuOpen(false);
              }}
            >
              Join Now
            </InteractiveHoverButton>
          )}
          {/* <InteractiveHoverButton className={"border-2 border-green-800"} onClick={() => { navigate("/join"); setMenuOpen(false); }}>Join Now</InteractiveHoverButton> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
