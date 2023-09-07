import * as React from "react";
import { useGetPokemonByNameQuery } from "../../stores/services/pokemonApi";

const Api = () => {
  const [param, setParam] = React.useState("pikachu");
  const { data, error, isLoading } = useGetPokemonByNameQuery(param);
  console.log("param", param);
  console.log("data", data);

  return (
    <div className="App">
      <button onClick={() => setParam("bulbasaur")}>API取得</button>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};
export default Api;
