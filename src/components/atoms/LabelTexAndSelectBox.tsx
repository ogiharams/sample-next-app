// LabelTexAndSelectBox.js
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selectBox: {
    width: 200,
  },
}));

const LabelTexAndSelectBox = ({
  selectedOption,
  setSelectedOption,
  options,
}) => {
  const classes = useStyles();
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div>aaaa</div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOption}
          onChange={handleChange}
          // name={name}
          className={classes.selectBox}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default LabelTexAndSelectBox;
