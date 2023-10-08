import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ポケモンの情報を取得するAPI
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    // ポケモンの基本情報を取得
    getPokemonBasicInfo: builder.query<any, string>({
      query: (id) => `pokemon/${id}`,
    }),
    // ポケモンの日本語名、カテゴリー、説明等の情報を取得
    getPokemonByName: builder.query<any, string>({
      query: (id) => `pokemon-species/${id}`,
    }),
  }),
});

export const { useGetPokemonBasicInfoQuery, useGetPokemonByNameQuery } =
  pokemonApi;
