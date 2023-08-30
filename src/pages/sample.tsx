const sample = () => {
  let moji: string = "文字";
  moji = "122222";

  const handleClick = (text: string, number: number, boolean: boolean) => {
    console.log(text);
    console.log(number);
  };
  // OK
  // const handleClick1 = () => {
  //   console.log("ボタン1をおしました");
  // };
  // const handleClick2 = () => {
  //   console.log("ボタン2をおしました");
  // };
  return (
    <div>
      <h1>test</h1>
      <button onClick={() => handleClick("ボタン1をおしました", 1, true)}>
        ボタン1
      </button>
      <button onClick={() => handleClick("ボタン2をおしました", 2, false)}>
        ボタン2
      </button>
    </div>
  );
};

export default sample;
