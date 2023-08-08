import Axios from "axios";
import { useEffect, useState } from "react";

const UseEffectRender = () => {
  const [user, setUser] = useState();
  const fetchJson = async () => {
    const res = await Axios.get("https://jsonplaceholder.typicode.com/users/1");
    return res.data;
  };
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchJson();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <p>
          I am {user.username} : {user.email}
        </p>
      ) : null}
    </div>
  );
};

export default UseEffectRender;
