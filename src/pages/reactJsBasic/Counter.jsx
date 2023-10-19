import { useEffect, useState } from "react";

const Counter = () => {
  /* React hooks */
  // useState
  // 状態を保持することが可能なhooks
  const [count, setCount] = useState(0);

  // カウントを1増やす
  const handleClickIncrementCount = () => {
    setCount(count + 1);
  };
  // カウントを1減らす
  const handleClickDecrementCount = () => {
    setCount(count - 1);
  };

  // useEffect
  // 関数の実行タイミングを制御できるhooks
  // レンダリング時
  useEffect(() => {
    console.log("レンダリング完了");
  }, []);

  // 初回レンダリング時、カウント変更時
  useEffect(() => {
    console.log("カウントが変わったよ");
  }, [count]);
  return (
    <>
      <div>counter</div>
      <button onClick={handleClickDecrementCount}>-</button>
      {count}
      <button onClick={handleClickIncrementCount}>+</button>
    </>
  );
};

export default Counter;
