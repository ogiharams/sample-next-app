import * as React from "react";
import { useGetPokemonByNameQuery } from "../../stores/services/pokemonApi";

const Api = () => {
  const [param, setParam] = React.useState(1);
  const { data, error, isLoading } = useGetPokemonByNameQuery(param);
  console.log("param", param);
  console.log("data", data);

  return (
    <div className="App">
      <button onClick={() => setParam(3)}>API取得</button>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
          {data.species.genera}
        </>
      ) : null}
    </div>
  );
};
export default Api;
