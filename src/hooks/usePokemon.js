import { apiDex } from "../servicios/api";
import { useEffect,useState } from "react";

export const usePokemon = () => {

  
  const consultar = async () => {
    let res = await apiDex("GET", "https://pokeapi.co/api/v2/pokemon/", null);
    console.log(res);
    return res.data    
  };

  const detallePokemon = async (url) => {
    let pokemon = await apiDex("GET", url, null);
    console.log(pokemon);
    return pokemon
  };

  return {
    detallePokemon,
    consultar,

    
  };
};
