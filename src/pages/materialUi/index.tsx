import { useEffect, useState } from "react";
import SortingAndSelectingTable from "../../components/molecules/materialUi/SortingAndSelectingTable";
import SelectBox from "../../components/templates/materialUi/SelectBox";
import DatePickerSample from "../../components/molecules/materialUi/DatePickerSample";

const index = () => {
  console.log("aaaa");
  console.log("bbbb");
  console.log("cccc");
  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [disabled3, setDisabled3] = useState(true);
  const [state, setState] = useState([
    { id: 1, state: "受付中" },
    { id: 2, state: "未接続" },
    { id: 3, state: "未接続" },
  ]);
  const handleClick = () => {
    // 生成したい状態の配列
    const states = ["未接続", "受付中", "受付完了", "エラー"];

    // ランダムなインデックスを生成
    const randomIndex1 = Math.floor(Math.random() * states.length);
    const randomIndex2 = Math.floor(Math.random() * states.length);
    const randomIndex3 = Math.floor(Math.random() * states.length);
    // ランダムな状態を取得
    const randomState1 = states[randomIndex1];
    const randomState2 = states[randomIndex2];
    const randomState3 = states[randomIndex3];
    setState([
      { id: 1, state: randomState1 },
      { id: 2, state: randomState2 },
      { id: 3, state: randomState3 },
    ]);
  };

  useEffect(() => {
    // "未接続", "受付完了"→非活性、 "受付中", "エラー"→活性
    const states2 = ["未接続", "受付完了"];
    const isDisabled = (prefecture: string) => {
      return states2.includes(prefecture);
    };
    const state1 = isDisabled(state[0].state);
    const state2 = isDisabled(state[1].state);
    const state3 = isDisabled(state[2].state);
    setDisabled1(state1);
    setDisabled2(state2);
    setDisabled3(state3);

    // switch (state[0].state) {
    //   case "未接続":
    //   case "受付完了":
    //     setDisabled1(true);
    //     break;
    //   default:
    //     setDisabled1(false);
    // }
    // switch (state[1].state) {
    //   case "未接続":
    //   case "受付完了":
    //     setDisabled2(true);
    //     break;
    //   default:
    //     setDisabled2(false);
    // }
    // switch (state[2].state) {
    //   case "未接続":
    //   case "受付完了":
    //     setDisabled3(true);
    //     break;
    //   default:
    //     setDisabled3(false);
    // }
  }, [state]);

  return (
    <div>
      <div>materialUi</div>
      <div>{state[0].state}</div>
      <button disabled={disabled1}>btn1</button>
      <div>{state[1].state}</div>
      <button disabled={disabled2}>btn2</button>
      <div>{state[2].state}</div>
      <button disabled={disabled3}>btn3</button>
      <button onClick={() => handleClick()}>状態変更</button>
      <SortingAndSelectingTable />
      <SelectBox />
      <DatePickerSample />
    </div>
  );
};

export default index;
