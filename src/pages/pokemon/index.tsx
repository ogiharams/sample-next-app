import { useEffect } from "react";
import Axios from "axios";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import styles from "./index.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { setPlayStartState } from "../../stores/slices/pokemon/playStartSlice";
import { setAllPokemonList } from "../../stores/slices/pokemon/allPokemonJapaneseNameSlice";
import PokemonInfoCard from "./PokemonInfoCard";

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
    width: "35%",
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
    bottom: "8%",
  },
  startButton: {
    width: 150,
    paddingRight: 5,
    color: "#412a3c",
    fontSize: "3rem",
    lineHeight: 1,
  },
  arrowRightIcon: {
    width: 40,
    fontSize: "3rem",
  },
}));

//  全てのポケモンの日本語名をサーバーで取得
export const getServerSideProps = async () => {
  const requestData = {
    lastPokemonNo: "151", //最後のポケモンのNoを設定
  };

  try {
    const response = await Axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/getAllPokemon`,
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
    console.log(error);
    return {
      props: {
        allPokemonData: null,
      },
    };
  }
};

const Pokemon = ({ allPokemonData }: any) => {
  const classes = useStyles();

  /* Redux関連 */
  const dispatch = useAppDispatch();
  // ポケモン図鑑のスタート状況を取得
  const playStart = useAppSelector((state) => state.playStartState.playStart);

  // StartボタンとBackボタン切り替えを行う関数
  const handleClickStartOrBackButton = (boolean: boolean): void => {
    dispatch(setPlayStartState({ playStart: boolean }));
  };

  // セレクトボックスに表示する全てのポケモンのリストを取得する関数
  const getAllPokemonJapaneseNameList = (): void => {
    dispatch(setAllPokemonList({ allPokemonJapaneseNameList: allPokemonData }));
  };

  // 画面表示時に実行
  useEffect(() => {
    getAllPokemonJapaneseNameList();
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
          {playStart ? (
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
            {playStart ? (
              <Button
                variant="contained"
                className={classes.startButton}
                onClick={() => handleClickStartOrBackButton(false)}
              >
                BACK
                <ArrowRightIcon className={`${classes.arrowRightIcon} icon`} />
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.startButton}
                onClick={() => handleClickStartOrBackButton(true)}
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
