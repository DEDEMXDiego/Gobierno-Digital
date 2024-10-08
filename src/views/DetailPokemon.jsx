import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import { CardPokemon } from "../components/CardPokemon";

export const DetailPokemon = () => {
  const { nombre } = useParams();
  const { detallePokemon, pokemonEvolucion, pokemonImagen } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [evoluciones, setEvoluciones] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await detallePokemon(nombre);
      setPokemon(data);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (!pokemon?.data?.id) return;

    const obtenerEvoluciones = async (evolutionChain) => {
      const promises = [];

      const extraerEvoluciones = (chain) => {
        if (chain?.species?.name) {
          const fetchImagen = async () => {
            const img = await pokemonImagen(chain.species.name);
            return { name: chain.species.name, img: img };
          };
          promises.push(fetchImagen());
        }
        if (chain?.evolves_to?.length > 0) {
          chain.evolves_to.forEach((nextEvolution) => {
            extraerEvoluciones(nextEvolution);
          });
        }
      };

      extraerEvoluciones(evolutionChain.chain);

      const evolucionesConImagen = await Promise.all(promises);
      return evolucionesConImagen;
    };

    const fetchEvoluciones = async () => {
      // Llamar a pokemonEvolucion con el ID del Pokémon para obtener la cadena evolutiva
      const evolutionChainData = await pokemonEvolucion(pokemon?.data?.id);
      const evolucionesArray = await obtenerEvoluciones(
        evolutionChainData.data
      );
      setEvoluciones(evolucionesArray);
    };

    fetchEvoluciones();
  }, [pokemon]);

  // useEffect(() => {
  //   if (!pokemon?.data?.id) return;

  //   const obtenerEvoluciones = async (evolutionChain) => {
  //     const promises = [];

  //     const extraerEvoluciones = (chain) => {
  //       if (chain?.species?.name) {
  //         const fetchImagen = async () => {
  //           const img = await pokemonImagen(chain.species.name);
  //           return { name: chain.species.name, img: img };
  //         };
  //         promises.push(fetchImagen());
  //       }
  //       if (chain?.evolves_to?.length > 0) {
  //         chain.evolves_to.forEach((nextEvolution) => {
  //           extraerEvoluciones(nextEvolution);
  //         });
  //       }
  //     };

  //     extraerEvoluciones(evolutionChain.chain);

  //     const evolucionesConImagen = await Promise.all(promises);
  //     return evolucionesConImagen;
  //   };

  //   const fetchEvoluciones = async () => {
  //     const data = await pokemonEvolucion(pokemon?.data?.id);
  //     const evolucionesArray = await obtenerEvoluciones(data.data);
  //     setEvoluciones(evolucionesArray);
  //   };

  //   fetchEvoluciones();
  // }, [pokemon]);

  console.log(pokemon);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4 uppercase">
        {nombre || (
          <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mx-auto"></div>
        )}
      </h1>

      {pokemon?.data?.sprites?.other?.dream_world?.front_default ? (
        <img
          className="w-full h-56 rounded-lg mb-4"
          src={pokemon?.data?.sprites?.other?.dream_world?.front_default}
          alt={nombre}
        />
      ) : (
        <div className="w-full h-56 bg-gray-300 rounded-lg animate-pulse"></div>
      )}
      <p className="text-lg">
        Peso:{" "}
        {pokemon?.data?.weight / 10 || (
          <span className="w-12 h-4 bg-gray-300 rounded animate-pulse inline-block"></span>
        )}{" "}
        KG
      </p>
      <p className="text-lg">
        Altura:{" "}
        {pokemon?.data?.height * 10 || (
          <span className="w-12 h-4 bg-gray-300 rounded animate-pulse inline-block"></span>
        )}{" "}
        cm
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {pokemon?.data?.types?.length ? (
          pokemon?.data?.types?.map((tipo, i) => (
            <div
              key={i}
              className="bg-blue-500 text-white px-3 py-1 rounded-full">
              {tipo?.type?.name}
            </div>
          ))
        ) : (
          <>
            <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </>
        )}
      </div>

      <div className="mb-4">
        {pokemon?.data?.stats?.length
          ? pokemon?.data?.stats?.map((stat, i) => (
              <div key={i} className="mb-2">
                <p className="text-md">{stat.stat.name}</p>
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className={`bg-green-500 rounded-full h-2`}
                    style={{ width: `${stat.base_stat / 2.55}%` }}></div>
                </div>
                <p className="text-md">{stat.base_stat}</p>
              </div>
            ))
          : Array(6)
              .fill("")
              .map((_, i) => (
                <div key={i} className="mb-2">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                  <div className="w-full bg-gray-200 rounded-full">
                    <div className="bg-gray-300 h-2 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Evoluciones</h2>
      <ul className="flex overflow-x-auto space-x-4">
        {evoluciones.length
          ? evoluciones.map((evolucion, i) => (
              <li
                key={i}
                className="flex-shrink-0 w-32 bg-white border rounded-lg shadow-md p-2">
                <h2 className="text-lg font-semibold text-center">
                  {evolucion.name}
                </h2>
                <img
                  className="w-full h-auto mx-auto"
                  src={evolucion.img}
                  alt={evolucion.name}
                />
              </li>
            ))
          : Array(3)
              .fill("")
              .map((_, i) => (
                <li
                  key={i}
                  className="flex-shrink-0 w-32 bg-white border rounded-lg shadow-md p-2">
                  <div className="w-20 h-6 bg-gray-300 rounded animate-pulse mb-2 mx-auto"></div>
                  <div className="w-full h-24 bg-gray-300 rounded-lg animate-pulse"></div>
                </li>
              ))}
      </ul>
    </div>
  );
};
