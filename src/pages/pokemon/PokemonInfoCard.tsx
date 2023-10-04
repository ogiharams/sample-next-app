import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  makeStyles,
} from "@material-ui/core";
import {
  useGetPokemonByNameQuery,
  useGetPokemonInfoQuery,
} from "../../stores/services/pokemonApi";
import Axios from "axios";
import { GetServerSideProps } from "next/types";

type Name = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

type Genera = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};
const useStyles = makeStyles((theme) => ({
  pokemonInfoArea: {
    width: 300,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  peper: {
    backgroundColor: "#e0e0e0",
    padding: "1rem",
  },
  arrowRightIcon: {
    width: 40,
    fontSize: "3rem",
  },
  pokemonImg: {
    paddingBottom: "1rem",
    width: "50%",
  },
  monsterBallImg: {
    width: "8%",
  },
  pokemonName: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  list: {
    "& > *": {
      fontSize: "1rem",
      padding: "0 0 0 0.5rem",
    },
  },
  labelText: {
    fontSize: "1rem",
  },
  listText: { fontSize: "0.7rem" },
  description: {
    fontSize: "0.8rem",
    padding: "8px 0 0 0",
  },
  backButton: {
    width: "100%",
    paddingRight: 5,
    color: "#412a3c",
    fontSize: "3rem",
  },
}));

const PokemonInfoCard = () => {
  const classes = useStyles();
  // ポケモンのNoをセットするポケモン情報取得時に渡す
  const [id, setId] = useState(94);
  // 全てのポケモンのリスト
  const [allPokemonList, setAllPokemonList] = useState([{ pokemonName: "" }]);
  console.log(allPokemonList);
  // 選択したポケモン
  const [pokemonName, setPokemonName] = useState("");
  // ポケモンの基本情報を取得
  const {
    data: data1,
    isLoading: isLoading1,
    error: error1,
  } = useGetPokemonInfoQuery(id);
  // ポケモンの日本語名等を取得
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGetPokemonByNameQuery(id);

  // 取得したポケモンの高さ、重さを変換する関数
  const conversionData = (num: number): number => {
    return num / 10;
  };

  // プルダウン押下時のイベントハンドラ
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // 表示するポケモンのIDを変更
    setId(event.target.value as number);
    // 表示するポケモンの名前を変更
    setPokemonName(event.target.value as string);
  };

  // const getPokemonJapaneseName = async () => {
  //   try {
  //     const response = await Axios.get(
  //       "https://pokeapi.co/api/v2/pokemon-species/?limit=10"
  //     );

  //     const pokemonList = response.data.results;
  //     for (const pokemon of pokemonList) {
  //       const detailsResponse = await Axios.get(pokemon.url);
  //       const japaneseName = detailsResponse.data.names.find(
  //         (name: Name) => name.language.name === "ja"
  //       ).name;

  //       setAllPokemonList((allPokemonList) => [
  //         ...allPokemonList,
  //         { pokemonName: japaneseName },
  //       ]);
  //     }
  //   } catch {}
  // };
  // const fetchData = async () => {
  //   try {
  //     const response = await Axios.get(
  //       `https://pokeapi.co/api/v2/pokemon-species/?limit=10`
  //     );

  //     if (response.status === 200) {
  //       // レスポンスからポケモンの情報を取得
  //       const pokemonSpecies = response.data.results;

  //       // ポケモンの日本語名を取り出して新しい配列を作成
  //       const japaneseNames = pokemonSpecies.map(async (species) => {
  //         const speciesResponse = await Axios.get(species.url);
  //         const japaneseName = speciesResponse.data.names.find(
  //           (name) => name.language.name === "ja"
  //         );
  //         return { pokemon: japaneseName.name };
  //       });

  //       // 日本語名の配列を待機
  //       const results = await Promise.all(japaneseNames);
  //       console.log("results", results);
  //     } else {
  //       console.error("API request failed");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };

  // // 初期表示時
  // useEffect(() => {
  //   // setAllPokemonList([{ pokemonName: "" }]);
  //   fetchData();
  //   // getPokemonJapaneseName();
  // }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={classes.pokemonInfoArea}
      >
        <Paper className={classes.peper}>
          {error1 && error2 ? (
            <>Error...</>
          ) : isLoading1 && isLoading2 ? (
            <>Error...</>
          ) : data1 && data2 ? (
            <>
              {" "}
              <Grid container justifyContent="center">
                <img
                  src={data1.sprites.other["official-artwork"].front_default}
                  alt={data1.species.name}
                  className={classes.pokemonImg}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Box className={classes.pokemonName}>
                    No.
                    {`${data1.id} ${
                      data2.names.find(
                        (name: Name) => name.language.name === "ja"
                      ).name
                    }`}
                    <img
                      src={`${process.env.NEXT_PUBLIC_URL}/pokemon/monster_ball.png`}
                      className={classes.monsterBallImg}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    className={classes.list}
                  >
                    <ListItem>
                      <Box>
                        category:
                        <span className={classes.listText}>
                          {
                            data2.genera.find(
                              (name: Genera) =>
                                name.language.name === "ja" ||
                                name.language.name === "ja-Hrkt" ||
                                name.language.name === "en"
                            ).genus
                          }
                        </span>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box>height:{conversionData(data1.height)}m</Box>
                    </ListItem>
                    <ListItem>
                      <Box>waight:{conversionData(data1.weight)}kg</Box>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={7} className={classes.description}>
                  <span className={classes.labelText}>description:</span>
                  <br />
                  {
                    data2.flavor_text_entries.find(
                      (flavor_text_entry: FlavorTextEntry) =>
                        flavor_text_entry.language.name === "ja" ||
                        flavor_text_entry.language.name === "ja-Hrkt" ||
                        flavor_text_entry.language.name === "en"
                    ).flavor_text
                  }
                </Grid>
              </Grid>
            </>
          ) : null}
        </Paper>
      </Grid>
      <Grid container justifyContent="center">
        <FormControl className={classes.formControl}>
          <InputLabel>POKEMON NAME</InputLabel>
          <Select value={pokemonName} onChange={handleChange}>
            {allPokemonList.map((data, index) => (
              <MenuItem key={index} value={index}>
                {data.pokemonName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default PokemonInfoCard;
