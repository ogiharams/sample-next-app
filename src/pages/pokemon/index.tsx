import { useEffect } from "react";
import Axios from "axios";
import {
  Box,
  Button,
  Grid,
  StylesProvider,
  makeStyles,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import {
  handleBackButton,
  handleStartButton,
  startState,
} from "../../stores/slices/pokemon/startInfoSlice";
import PokemonInfoCard from "./PokemonInfoCard";
import { setAllPokemonList } from "../../stores/slices/pokemon/pokemonSlice";

type Name = {
  language: {
    name: string;
    url: string;
  };
  name: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/pokemon/gengar.jpeg)`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#8b60a8",
    backgroundSize: "100%",
    height: "100vh",
  },
  pokemonLogo: {
    marginTop: 20,
    marginBottom: 20,
    width: "45%",
    opacity: "0.9",
  },
  masterBallLogo: {
    margin: "100px 0 30px 0",
    width: 100,
    height: 100,
    opacity: "0.7",
  },
  buttonArea: {
    position: "fixed",
    bottom: "5%",
  },
  startButton: {
    width: 150,
    paddingRight: 5,
    color: "#412a3c",
    fontSize: "3rem",
    lineHeight: 1.3,
  },
  arrowRightIcon: {
    width: 40,
    fontSize: "3rem",
  },
}));

//  全てのポケモンの情報を事前に取得
export const getServerSideProps = async () => {
  const requestData = {
    lastPokemonNo: "10",
  };

  try {
    const response = await Axios.post(
      `http://localhost:3000/api/getAllPokemon`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // シリアル化可能なデータを抽出
      const responseData = response.data;

      return {
        props: {
          // シリアル化可能なデータだけをpropsに含める
          allPokemonData: responseData,
        },
      };
    }
  } catch (error) {
    console.log("api error");
    return {
      props: {
        allPokemonData: null,
      },
    };
  }
};

const Pokemon = ({ allPokemonData }: any) => {
  console.log("allPokemonData", allPokemonData);

  const classes = useStyles();

  // Redux関連
  const allPokeonListState = useAppSelector(
    (state) => state.pokemonState.allPokemonList
  );
  console.log(allPokeonListState);
  const dispatch2 = useAppDispatch();
  const dispatch = useDispatch();
  const start = useSelector(startState);

  // startボタンとbackボタン切り替え
  const handleStartButtonClick = (): void => {
    dispatch(handleStartButton());
  };
  // startボタンとbackボタン切り替え
  const handleBackButtonClick = (): void => {
    dispatch(handleBackButton());
  };

  const changeAllPokemonList = () => {
    dispatch2(setAllPokemonList({ allPokemonList: allPokemonData }));
  };

  useEffect(() => {
    changeAllPokemonList();
  }, []);

  return (
    <>
      <Box className={`${classes.root} ${styles.body} `}>
        <Grid container justifyContent="center">
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/pokemon/pokemon_logo.png`}
            className={classes.pokemonLogo}
          />
        </Grid>
        <Grid container justifyContent="center">
          {start ? (
            <PokemonInfoCard />
          ) : (
            <Box>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/pokemon/master_ball.png`}
                className={classes.masterBallLogo}
              />
            </Box>
          )}
        </Grid>
        <Grid container justifyContent="center">
          <Box className={classes.buttonArea}>
            {start ? (
              <Button
                variant="contained"
                className={classes.startButton}
                onClick={() => handleBackButtonClick()}
              >
                BACK
                <ArrowRightIcon className={`${classes.arrowRightIcon} icon`} />
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.startButton}
                onClick={() => handleStartButtonClick()}
              >
                START
                <ArrowRightIcon className={`${classes.arrowRightIcon} icon`} />
              </Button>
            )}
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Pokemon;
