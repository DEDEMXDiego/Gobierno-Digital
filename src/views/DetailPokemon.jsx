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
    if (!pokemon?.data?.id) return; // Espera hasta que se cargue el pokemon

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
      const data = await pokemonEvolucion(pokemon?.data?.id);
      const evolucionesArray = await obtenerEvoluciones(data.data);
      setEvoluciones(evolucionesArray);
    };

    fetchEvoluciones();
  }, [pokemon]);

  console.log(pokemon);

  return (
    <div>
      <h1> {nombre}</h1>
      <img src={pokemon?.data?.sprites?.other?.dream_world?.front_default} alt="" />
      <p>Peso: {pokemon?.data?.weight/10} KG</p>
      <p>Altura: {pokemon?.data?.height*10} cm</p>
      <div>{pokemon?.data?.types?.map((tipo,i)=> (
        <div key={i}>{tipo?.type?.name}</div>
      ))}</div>
      <div>
        {pokemon?.data?.stats?.map((stat,i) => (
            <div key={i}>
                <p>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
            </div>
        ))}
      </div>


      
      <h2>Evoluciones</h2>
      <ul>
        {evoluciones.map((evolucion, i) => (
          <div key={i}>
            <h2>{evolucion.name}</h2>
            <img src={evolucion.img} alt={evolucion.name} />
          </div>
        ))}
      </ul>
    </div>
  );
};
