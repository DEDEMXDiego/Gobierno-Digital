import React from 'react';
import { Logo } from './Icons';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-center">
       <Logo/>
        <p className="text-sm mb-2">Diego Beltrán</p>
        <p className="text-xs">Uso de PokeAPI</p>
      </div>
    </footer>
  );
};

