// SelectBox.js
import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import LabelTexAndSelectBox from "../../atoms/LabelTexAndSelectBox";

const useStyles = makeStyles((theme) => ({
  selectBox: {
    "& input": {
      width: 200,
    },
  },
}));

const SelectBox = () => {
  const classes = useStyles();
  const [selectedOption1, setSelectedOption1] = useState(""); // 初期値を空文字列に設定
  const [selectedOption2, setSelectedOption2] = useState(""); // 初期値を空文字列に設定

  const options1 = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    // 他のオプションも追加
  ];
  const options2 = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    // 他のオプションも追加
  ];

  return (
    <>
      <Grid container>
        <Grid item>
          <LabelTexAndSelectBox
            options={options1}
            selectedOption={selectedOption1}
            setSelectedOption={setSelectedOption1}
            name={"options1"}
          />
        </Grid>
        <Grid item>
          <LabelTexAndSelectBox
            options={options2}
            selectedOption={selectedOption2}
            setSelectedOption={setSelectedOption2}
            name={"options2"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SelectBox;
