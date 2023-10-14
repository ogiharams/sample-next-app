import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type PokemonJapaneseName = {
  pokemonJapaneseName: string;
};

type AllPokemonJapaneseNameList = {
  allPokemonJapaneseNameList: PokemonJapaneseName[];
};

const initialState: AllPokemonJapaneseNameList = {
  allPokemonJapaneseNameList: [{ pokemonJapaneseName: "" }],
};

// 全てのポケモンの日本語名を管理するSlice
export const allPokemonJapaneseNameSlice = createSlice({
  name: "allPokemonJapaneseName",
  initialState,
  reducers: {
    // State更新用Action
    setAllPokemonList: (
      state,
      action: PayloadAction<AllPokemonJapaneseNameList>
    ) => {
      state.allPokemonJapaneseNameList =
        action.payload.allPokemonJapaneseNameList;
    },
  },
});

export const { setAllPokemonList } = allPokemonJapaneseNameSlice.actions;

export const selectCount = (state: RootState) =>
  state.allPokemonJapaneseNameState.allPokemonJapaneseNameList;

export const allPokemonJapaneseNameReducer =
  allPokemonJapaneseNameSlice.reducer;
