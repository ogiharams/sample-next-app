import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonInfo: builder.query({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonByName: builder.query({
      query: (id) => `pokemon-species/${id}`,
    }),
  }),
});

export const { useGetPokemonInfoQuery, useGetPokemonByNameQuery } = pokemonApi;
