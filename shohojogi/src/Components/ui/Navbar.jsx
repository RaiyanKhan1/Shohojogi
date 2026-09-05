import React, { useState } from 'react'; 
import { InteractiveHoverButton } from './interactive-hover-button';
import { LeafyGreen } from 'lucide-react';
import { Menu, X } from 'lucide-react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbar(){

    const navLinks = [{ name: "Find Work", link: "/find-work" },
                      { name: "Hire People", link: "/collections" },
                      { name: "Why Shohojogi", link: "/why-shohojogi" },
                      {name: "ProductPage (demo)", link: "/product" },
                      {name: "taskPage (demo)", link: "/task" },
                        ];
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    const handleLogout = async () => {
  // Ask the server to clear the cookie
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
        <img className="flex h-7 sm:h-8 w-auto m-4 cursor-pointer" src="src/assets/icons/banner.svg" onClick={() => navigate("/")}></img>
        </div>
          <div className="hidden md:flex ml-auto items-center gap-3">
        <ul className="flex gap-4 lg:gap-5">
           {navLinks.map((item, index) => (
            <li key={index} className="cursor-pointer font-light hover:text-green-700 p-0.5 group relative">
            
              <NavLink to={item.link}>
            {item.name}
 
                <span className="
                absolute left-1/2 -bottom-1 h-1 w-full -translate-x-1/2
                scale-x-0 bg-green-700 opacity-0 origin-center transition-all duration-500 ease-out
                group-hover:scale-x-50
                group-hover:opacity-100 rounded-full
                ">

                </span>
            </NavLink>
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
    className="border-2 border-green-500"
    onClick={() => navigate("/join")}
  >
    Join Now
  </InteractiveHoverButton>
)}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden p-2 rounded-lg hover:bg-gray-200 transition'>
          {menuOpen ? <X size={28} color="green"/> : <Menu size={28} color="green"/>}
        </button>

        </div>

        {menuOpen && (<div className="md:hidden border-t border-gray-200 bg-white px-6 py-5 shadow-md">
          <ul className="flex flex-col gap-4">
           {navLinks.map((link, index) => (
            <li key={index} className="cursor-pointer font-quicksand font-light hover:text-green-700 p-0.5 group relative" onClick={() => setMenuOpen(false)}>
                <NavLink to={link.link}>{link.name}</NavLink>
            </li>
           ))}
        </ul>

        <InteractiveHoverButton className={"border-2 border-green-800"} onClick={() => { navigate("/join"); setMenuOpen(false); }}>Join Now</InteractiveHoverButton>

        </div>)}
    </nav>
  )
}

export default Navbar