import { useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";

const DatePickerSample = () => {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <div>aaa</div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          label="label"
          value={date}
          onChange={setDate}
          format="yyyy/MM/dd"
          animateYearScrolling
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default DatePickerSample;
