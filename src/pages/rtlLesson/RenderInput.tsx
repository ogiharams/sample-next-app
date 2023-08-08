import { useState } from "react";
import { deflate } from "zlib";

const RenderInput = ({ outputConsole }) => {
  const [input, setInput] = useState("");
  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };
  const updateValue = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <input
        id="title"
        type="text"
        placeholder="Enter"
        value={input}
        onChange={updateValue}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};
export default RenderInput;
