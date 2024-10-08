import { apiDex } from "../servicios/api";
import { useEffect,useState } from "react";

export const usePokemon = () => {

  
  const consultar = async () => {
    let res = await apiDex("GET", "https://pokeapi.co/api/v2/pokemon/", null);
    console.log(res);
    return res.data    
  };

  const detallePokemon = async (id) => {
    let pokemon = await apiDex("GET", `https://pokeapi.co/api/v2/pokemon/${id}`, null);
    console.log(id);
    return pokemon
  };

  const pokemonEvolucion = async (id) => {
    let pokemon = await apiDex("GET", `https://pokeapi.co/api/v2/evolution-chain/${id}`, null);
    console.log(id);
    return pokemon
  };

  const pokemonImagen = async (id) => {
    let pokemon = await apiDex("GET", `https://pokeapi.co/api/v2/pokemon/${id}`, null);
    console.log(pokemon?.data?.sprites?.front_default);
    return pokemon?.data?.sprites?.front_default
  };



  return {
    detallePokemon,
    consultar,
    pokemonEvolucion,
    pokemonImagen,    
  };
};
