import React, { useState } from "react";

const Navbar = () => {
 
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo/Name */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-black">
            PeopleLink
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
