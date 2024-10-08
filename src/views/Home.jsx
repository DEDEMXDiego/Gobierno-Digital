import { CardPokemon } from "../components/CardPokemon";
import { usePokemon } from "../hooks/usePokemon";
import { useEffect, useState } from "react";

export const Home = () => {
  const [pokemons, setPokemons] = useState();
  const { consultar } = usePokemon();
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  useEffect(() => {
    const fetchPokemons = async () => {
      const p = await consultar(url);
      setNext(p.next);
      setPrevious(p.previous);
      setPokemons(p);
    };
    fetchPokemons();
  }, [url]);

  const handlePageChange = (newUrl) => {
    setUrl(newUrl);
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mx-auto max-w-screen-lg p-4">
        {pokemons?.results?.length
          ? pokemons.results.map((pokemon, i) => (
              <CardPokemon
                key={pokemon.name}
                nombre={pokemon.name}
                url={pokemon.url}
              />
            ))
          : // Skeleton loader when data is loading
            Array(20)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg shadow-lg p-4 animate-pulse">
                  <div className="h-32 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        {previous && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => handlePageChange(previous)}>
            Anterior
          </button>
        )}
        {next && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => handlePageChange(next)}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};
