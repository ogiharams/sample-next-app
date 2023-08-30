import { useState } from "react";
import { useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCounter,
} from "../../stores/slices/rtkLesson/custiomCounterSlice";
import { useDispatch } from "react-redux";

const Redux = () => {
  const [number, setNumber] = useState(0);
  const count = useSelector(selectCounter);
  const despatch = useDispatch();

  return (
    <div>
      <h3>Redux integration test</h3>
      <button onClick={() => despatch(increment())}>+</button>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => despatch(decrement())}>-</button>
      <button onClick={() => despatch(incrementByAmount(number | 0))}>
        IncrementByAmount
      </button>
      <input
        type="text"
        placeholder="Enter"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </div>
  );
};

export default Redux;
