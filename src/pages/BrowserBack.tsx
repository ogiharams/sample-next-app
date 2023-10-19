import { useCallback, useEffect, useState } from "react";

export default function App() {
  const blockBrowserBack = () => {
    return true;
  };

  useEffect(() => {
    // 直前の履歴に現在のページを追加
    window.history.pushState(null, "", window.location.href);

    // 直前の履歴と現在のページのループ
    window.addEventListener("popstate", blockBrowserBack);

    // クリーンアップは忘れない
    return () => {
      window.removeEventListener("popstate", blockBrowserBack);
    };
  }, [blockBrowserBack]);
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}
