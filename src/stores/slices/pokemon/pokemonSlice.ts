import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type PokemonName = {
  pokemonName: string;
};

// オブジェクトの配列として型定義
type AllPokemonList = {
  allPokemonList: PokemonName[];
};

const initialState: AllPokemonList = {
  allPokemonList: [{ pokemonName: "" }],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setAllPokemonList: (state, action: PayloadAction<AllPokemonList>) => {
      state.allPokemonList = action.payload.allPokemonList;
    },
  },
});

export const { setAllPokemonList } = pokemonSlice.actions;

export const selectCount = (state: RootState) =>
  state.pokemonState.allPokemonList;

export const pokemonReducer = pokemonSlice.reducer;
