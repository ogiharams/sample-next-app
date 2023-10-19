import Axios from "axios";
import Counter from "./counter";
import { useEffect } from "react";

// 関数
const index = () => {
  /***  JavaScript基礎 ***/
  /* 参考資料 */
  // MDN:https://developer.mozilla.org/ja/docs/Web

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

  /* API */
  // fetchAPI
  const getData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users/")
      .then((response) => {
        // レスポンスエラーの場合、エラーを投げる（catchで取得）
        if (!response.ok) {
          throw new Error(response.status);
        }
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getData();

  // Axios
  const getData2 = async () => {
    await Axios.get("https://jsonplaceholder.typicode.com/users/")
      .then((response) => {
        // レスポンスエラーの場合、エラーを投げる（catchで取得）
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getData2();

  /*** React,Next.js基礎 ***/
  /* 
    Reactとは？
    ・FaceBookが開発したJavaScriptのUI構築に特化したライブラリ
    
    特徴
    ・コンポーネントベースのアーキテクチャ
      →コンポーネント単位に分割（ファイル分割）してUIを作成
      →再利用性が向上し、コード量が減る
    ・仮想DOM
      →実際のDOMと仮想DOMを比較し変更があった部分のみ実際のDOMに適応するのでパフォーマンスが向上する
    ・JSX記法
      →JavaScript内でHTMLライクな構文でUIコンポーネントの記述が可能

    Next.jsとは？
    ・Reactをベースにしたフレームワーク
      →ウェブアプリケーションを構築する上で便利な機能を提供
    
    特徴
    ・サーバーサイドレンダリング（SSR）
      →ページを事前にサーバーでレンダリングすることが可能
    ・ルーティング
      →ルートディレクトリ内のファイルが自動的にページになる為、ルーティング設定がシンプル
    ・APIルート
      →APIエンドポイントを簡単に作成できる
  */

  return (
    // JSX記法
    <>
      <div>Javascript,Reactの基礎</div>
      <Counter />
    </>
  );
};

export default index;
