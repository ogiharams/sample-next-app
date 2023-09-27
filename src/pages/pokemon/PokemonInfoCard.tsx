import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
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
    width: "35%",
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
  const [id, setId] = useState(94);
  const [getPokemon, setGetPokemon] = useState(true);
  const [allPokemonList, setAllPokemonList] = useState([{ pokemonName: "" }]);
  const [pokemonName, setPokemonName] = useState("");
  const {
    data: data1,
    isLoading: isLoading1,
    error: error1,
  } = useGetPokemonInfoQuery(id);
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useGetPokemonByNameQuery(id);
  const conversionData = (num: number): number => {
    return num / 10;
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setId(event.target.value as number);
    setPokemonName(event.target.value as string);
  };

  const getPokemonJapaneseName = async () => {
    try {
      const response = await Axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/?limit=1016"
      );

      const pokemonList = response.data.results;
      for (const pokemon of pokemonList) {
        const detailsResponse = await Axios.get(pokemon.url);
        const japaneseName = detailsResponse.data.names.find(
          (name: Name) => name.language.name === "ja"
        ).name;
        setAllPokemonList((allPokemonList) => [
          ...allPokemonList,
          { pokemonName: japaneseName },
        ]);
      }
    } catch {}
  };
  useEffect(() => {
    setAllPokemonList([{ pokemonName: "" }]);
    getPokemonJapaneseName();
  }, []);

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
                {/* <Grid item xs={4}></Grid> */}
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
          <InputLabel id="demo-simple-select-label">POKEMON NAME</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pokemonName}
            onChange={handleChange}
          >
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
