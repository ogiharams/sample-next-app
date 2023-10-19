import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  hidden: {
    display: "none",
  },
}));
const SelectBox = () => {
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [data1, setData1] = useState([
    {
      body: "body",
      email: "email",
      id: 0,
      name: "name",
      postId: 0,
    },
  ]);
  // console.log(data1);
  const [data2, setData2] = useState([
    {
      body: "body",
      email: "email",
      id: 0,
      name: "name",
      postId: 0,
    },
  ]);

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  const fetchData = async () => {
    const requestData = {
      key1: 1,
    };
    const apiUrl = `/api/jsonplaceholderUser/`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // リクエストのコンテンツタイプを指定
        },
      });

      if (response.status === 200) {
        setData1(response.data);
        // console.log(response.data);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("API request failed", error);
    }
  };
  const fetchData2 = async () => {
    const requestData = {
      key1: 1,
    };
    const apiUrl = `/api/jsonplaceholderUser/`;

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json", // リクエストのコンテンツタイプを指定
        },
      });

      if (response.status === 200) {
        // console.log(response);
        setData2(response.data);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("API request failed", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" className={classes.hidden}>
          Age
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          data-testid="selectBox1"
        >
          {data1.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          data-testid="selectBox2"
        >
          {data2.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectBox;
