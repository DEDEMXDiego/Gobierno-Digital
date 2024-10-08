import {React, useState, useEffect} from "react";
import { usePokemon } from "../hooks/usePokemon";

export const CardPokemon = ({ nombre, url }) => {
  const [pokemon, setPokemon] = useState(null);
  const { detallePokemon } = usePokemon();

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await detallePokemon(url);
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <img
        className="w-full h-48 object-contain"
        src={pokemon?.data?.sprites?.front_default}
        alt={nombre}
      />
      <div className="px-6 py-4">
        <h1 className="font-bold text-xl mb-2 text-center capitalize">
          {nombre}
        </h1>
        <p className="text-gray-700 text-base truncate">{pokemon?.name}</p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Ver más
        </button>
      </div>
    </div>
  );
};
