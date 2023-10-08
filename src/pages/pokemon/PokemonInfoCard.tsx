import { ChangeEvent, useState } from "react";
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
  useGetPokemonBasicInfoQuery,
} from "../../stores/services/pokemonApi";
import { useAppSelector } from "../../hooks/reduxHooks";

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
  // ポケモンのNo
  const [id, setId] = useState("94");
  // 全てのポケモンのリスト
  const [allPokemonList, setAllPokemonList] = useState([{ pokemonName: "" }]);
  // 選択したポケモン
  const [pokemonName, setPokemonName] = useState("");
  // ポケモンの基本情報を取得
  const {
    data: pokemonBasicInfoData,
    isLoading: pokemonBasicInfoIsLoading,
    error: pokemonBasicInfoError,
  } = useGetPokemonBasicInfoQuery(id);

  // ポケモンの日本語名等を取得
  const {
    data: pokemonByNameData,
    isLoading: pokemonByNameIsLoading,
    error: pokemonByNameError,
  } = useGetPokemonByNameQuery(id);

  /* Redux関連 */
  // 全てのポケモンの日本語名を取得
  const allPokemonJapaneseNameState = useAppSelector(
    (state) => state.allPokemonJapaneseNameState.allPokemonJapaneseNameList
  );

  // 取得したポケモンの高さ、重さを変換する関数
  const conversionData = (num: number): number => {
    return num / 10;
  };

  // プルダウン押下時のイベントハンドラ
  const handleChangeSelectBox = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    // 表示するポケモンのIDを変更
    setId((Number(event.target.value) + 1).toString());
    // 表示するポケモンの名前を変更
    setPokemonName(String(event.target.value));
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={classes.pokemonInfoArea}
      >
        <Paper className={classes.peper}>
          {pokemonBasicInfoError && pokemonByNameError ? (
            <>...Error</>
          ) : pokemonBasicInfoIsLoading && pokemonByNameIsLoading ? (
            <>...isLoading2</>
          ) : pokemonBasicInfoData && pokemonByNameData ? (
            <>
              {" "}
              <Grid container justifyContent="center">
                <img
                  src={
                    pokemonBasicInfoData.sprites.other["official-artwork"]
                      .front_default
                  }
                  alt={pokemonBasicInfoData.species.name}
                  className={classes.pokemonImg}
                />
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Box className={classes.pokemonName}>
                    No.
                    {`${pokemonBasicInfoData.id} ${
                      pokemonByNameData.names.find(
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
                            pokemonByNameData.genera.find(
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
                      <Box>
                        height:{conversionData(pokemonBasicInfoData.height)}m
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box>
                        waight:{conversionData(pokemonBasicInfoData.weight)}kg
                      </Box>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={7} className={classes.description}>
                  <span className={classes.labelText}>description:</span>
                  <br />
                  {
                    pokemonByNameData.flavor_text_entries.find(
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
          <Select value={pokemonName} onChange={handleChangeSelectBox}>
            {allPokemonJapaneseNameState.map((data, index) => (
              <MenuItem key={index} value={index}>
                {data.pokemonJapaneseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default PokemonInfoCard;
