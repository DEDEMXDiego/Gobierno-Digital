import React from 'react';
import { Logo } from './Icons';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Logo/>
        </div>
        <div>
          <Link to="/" className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200">
            Inició
          </Link>
        </div>
      </div>
    </nav>
  );
};