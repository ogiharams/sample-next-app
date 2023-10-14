// 関数
const index = () => {
  /***  JavaScript基礎 ***/
  /* 変数 */
  let variableName = "変数";
  /* 定数 */
  const constantName = "定数";
  console.log(variableName, constantName);

  /* データ型 */
  // 数値
  const number = 10;
  // 文字列
  const string = "文字列";
  // 真偽値(true or false)
  const boolean = true;
  // 値が未定義の状態(意図的に設定しない限り設定されない)
  let undefinedValue;
  // 値が存在しない状態(意図しなくても、自動的に設定される)
  const nullValue = null;
  console.log(number, string, boolean, undefinedValue, nullValue);

  /* 関数 */
  // 関数定義
  const addFunction = (num1, num2) => {
    const addedValue = num1 + num2;
    return addedValue;
  };
  // 関数実行
  const result = addFunction(1, 2);
  console.log(result);

  /* 条件分岐 */
  // if/else文
  const old = -5;
  if (old >= 0 && old < 20) {
    console.log(`${old}歳は子供だよ`);
  } else if (old >= 20) {
    console.log(`${old}歳は大人だよ`);
  } else if (old > 1000) {
    console.log(`${old}歳は仙人だよ`);
  } else {
    console.log("人間？");
  }

  // switch文
  const lang = "Japanese";
  switch (lang) {
    case "Japanese":
      console.log(`${lang}は日本語です`);
      break;
    case "English":
      console.log(`${lang}は英語語です`);
      break;
    case "Spanish":
      console.log(`${lang}はスペイン語です`);
      break;
    default:
      console.log("何語かわかりません");
  }

  /* ループ */
  // for分
  let loopTimes = 10;
  for (let i = 0; i < loopTimes; i++) {
    console.log(i);
  }

  /* 配列 */
  // 配列定義
  const fluitsArray = ["りんご", "ぶどう", "ばなな"];
  // 配列へのアクセス
  const fluit = fluitsArray[1];
  console.log(fluit);

  /* オブジェクト */
  // オブジェクト定義
  const userObject = { name: "ユーザー名", old: 20 };
  // オブジェクトへのアクセス
  // ドット記法
  const userName = userObject.name;
  // ブラケット記法
  const userOld = userObject["old"];
  console.log(userName, userOld);

  // 配列&オブジェクト
  // 定義
  const usersArray = [
    { name: "user1", old: 10 },
    { name: "user2", old: 20 },
  ];
  // アクセス
  const user2Name = usersArray[1].name;
  const user2Old = usersArray[1].old;
  console.log(user2Name, user2Old);

  /* 同期/非同期処理 */
  // 同期処理（順番に処理を実行）
  const function1 = () => {
    console.log("処理1");
    console.log("処理2");
    console.log("処理3");
  };
  function1();

  // 非同期処理
  const asynchronousProcess = (string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(string);
      }, 5000);
    });
  };

  // 非同期処理を待っていない例
  const function2 = () => {
    console.log("処理4");

    const result = asynchronousProcess("処理5");
    console.log(result);

    console.log("処理6");
  };
  function2();

  // 非同期処理を待っていない例
  const function3 = async () => {
    console.log("処理7");

    const result = await asynchronousProcess("処理8");
    console.log(result);

    console.log("処理9");
  };
  function3();

  return (
    <>
      <div>Enter</div>
    </>
  );
};

export default index;
