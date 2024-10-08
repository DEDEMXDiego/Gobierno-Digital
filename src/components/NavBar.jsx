import React from 'react';

export const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-10 w-10 mr-3" />
          <span className="text-white text-xl font-bold">MiApp</span>
        </div>

        {/* Botón de Home */}
        <div>
          <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200">
            Home
          </button>
        </div>
      </div>
    </nav>
  );
};