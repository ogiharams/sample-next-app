import { useState } from "react";
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
import {
  handleBackButton,
  handleStartButton,
  startState,
} from "../../stores/slices/pokemon/startInfoSlice";
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
    marginTop: 35,
    marginBottom: 20,
    width: "50%",
    opacity: "0.9",
  },
  masterBallLogo: {
    width: 100,
    height: 100,
    opacity: "0.7",
  },
  mainArea: {
    position: "absolute",
    top: "50%",
  },
  buttonArea: {
    position: "absolute",
    top: "80%",
  },
  startButton: {
    width: 150,
    paddingRight: 5,
    color: "#412a3c",
    fontSize: "3rem",
  },
  arrowRightIcon: {
    width: 40,
    fontSize: "3rem",
  },
}));

const Pokemon = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const start = useSelector(startState);
  const handleStartButtonClick = (): void => {
    dispatch(handleStartButton());
  };
  const handleBackButtonClick = (): void => {
    dispatch(handleBackButton());
  };

  return (
    <>
      <StylesProvider injectFirst>
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
              <Box className={classes.mainArea}>
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
                  <ArrowRightIcon
                    className={`${classes.arrowRightIcon} icon`}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes.startButton}
                  onClick={() => handleStartButtonClick()}
                >
                  START
                  <ArrowRightIcon
                    className={`${classes.arrowRightIcon} icon`}
                  />
                </Button>
              )}
            </Box>
          </Grid>
        </Box>
      </StylesProvider>
    </>
  );
};

export default Pokemon;
