import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await Axios.get(
      "https://pokeapi.co/api/v2/pokemon-species/?limit=10"
    );

    if (response.status === 200) {
      const pokemonSpecies = response.data.results;

      const japaneseNames = await Promise.all(
        pokemonSpecies.map(async (species: any) => {
          const speciesResponse = await Axios.get(species.url);
          const japaneseName = speciesResponse.data.names.find(
            (name: any) => name.language.name === "ja"
          );
          return { pokemonNme: japaneseName ? japaneseName.name : "" };
        })
      );

      res.status(200).json(japaneseNames);
    } else {
      res.status(response.status).json({ error: "API request failed" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
