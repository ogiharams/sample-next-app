import axios from "axios";
import { useState } from "react";
const MockServer = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    let isMounted = true;
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const { username } = res.data;
        if (isMounted) {
          setUsername(username);
          // setClicked(true);
          console.log(res.data);
        }
      })
      .catch(() => {
        setError("Fetching Failed");
      });
    return () => {
      isMounted = false;
    };
  };
  const buttonText = clicked ? "Loaded" : "Start Fetch";
  return (
    <>
      <div>
        <button onClick={fetchUser} disabled={clicked}>
          {buttonText}
        </button>
        {username && <h3>{username}</h3>}
        {error && <p data-testid="error">{error}</p>}
      </div>
    </>
  );
};

export default MockServer;
