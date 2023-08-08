import React, { useState } from "react";

interface Props {
  text: string;
}
interface UserData {
  id: number;
  name: string;
}

const TestComponent: React.FC<Props> = (props) => {
  const [count, setCount] = useState<number | null>(0);
  const [user, setUser] = useState<UserData>({ id: 1, name: "name" });
  const [inputData, setInputData] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputData(e.target.value);
  };

  return (
    <div>
      <div>{props.text}</div>
      <div>{count}</div>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <div>{inputData}</div>
    </div>
  );
};

export default TestComponent;
