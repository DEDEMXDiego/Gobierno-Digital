import React from "react";
import { Route, Routes } from "react-router-dom";
import {Home} from "../views/Home"
import {DetailPokemon} from "../views/DetailPokemon"

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="detalles" element={<DetailPokemon/>} />
      </Routes>
    </>
  );
};