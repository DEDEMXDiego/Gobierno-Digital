import { CardPokemon } from "../components/CardPokemon";
import { usePokemon } from "../hooks/usePokemon";
import { useEffect, useState } from "react";

export const Home = () => {
  const [pokemons, setPokemons] = useState();
  const { consultar } = usePokemon();

  useEffect(() => {
    const fetchPokemons = async () => {
      const p = await consultar();
      setPokemons(p);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mx-auto max-w-screen-lg p-4">
      {pokemons?.results?.map((pokemon, i) => (
        <CardPokemon
          key={pokemon.name}
          nombre={pokemon.name}
          url={pokemon.url}
        />
      ))}
    </div>
  );
};
