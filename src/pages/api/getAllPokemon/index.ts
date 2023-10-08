import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";

type Species = {
  name: string;
  url: string;
};

// 全てのポケモンの情報を取得するAPI
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const requestData = req.body;
  try {
    await Axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/?limit=${requestData.lastPokemonNo}`
    )
      .then(async (response) => {
        // API実行成功時
        // ポケモンの英語名と日本語名等が取得できるAPIエンドポイント
        const pokemonSpecies = response.data.results;

        // ポケモンの日本語名を取得
        const japaneseNames = await Promise.all(
          pokemonSpecies.map(async (species: Species) => {
            // ポケモンの日本語名等の情報を取得
            const speciesResponse = await Axios.get(species.url);
            // ポケモンの日本語を特定し返す
            const japaneseName = speciesResponse.data.names.find(
              (name: any) => name.language.name === "ja"
            );
            return {
              pokemonJapaneseName: japaneseName ? japaneseName.name : "",
            };
          })
        );

        // レスポンス200
        res.status(200).json(japaneseNames);
      })
      .catch((error) => {
        // API実行失敗時
        // API実行エラー時は返却されたレスポンスを返す
        res.status(error.status).json({ error: "API request failed" });
      });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
