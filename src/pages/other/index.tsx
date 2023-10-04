import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeState,
  incrementByAmount,
  selectCount,
} from "../../stores/slices/counter/counterSlice";

const index = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const despatch = useDispatch();
  const count = useSelector(selectCount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, name: value });
  };

  const handleClick2 = () => {
    // e.preventDefault();
    const requestData = {
      key1: formData.name,
      key2: formData.name,
    };
    const apiUrl = `/api/jsonplaceholderUser/`;

    const fetchUserData = async () => {
      try {
        const response = await axios.post(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json", // リクエストのコンテンツタイプを指定
          },
        });

        if (response.status === 200) {
          const data = response.data;
          // データを使用する
          console.log(data);
          despatch(changeState(data));
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("API request failed", error);
      }
    };

    // APIにアクセスしてユーザーデータを取得;
    fetchUserData();
  };
  const itemList = Object.keys(count).map((key) => (
    <div key={key}>{count[key]}</div>
  ));

  return (
    <>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <button onClick={() => handleClick2()}>Submit</button>
    </>
  );
};

export default index;
