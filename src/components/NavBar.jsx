import React from "react";
import { Logo } from "./Icons";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <div>
          <Link
            to="/"
            className="text-white font-bold py-2 px-4 rounded transition-transform duration-300 hover:text-yellow-500 hover:scale-105">
            Inicio
          </Link>
        </div>
      </div>
    </nav>
  );
};
