import { useEffect } from "react";
import axios from "axios";

const index = () => {
  useEffect(() => {
    const fixedSlug = "1"; // 固定のスラッグ
    const requestData = {
      key1: "1",
      key2: "2",
    };
    const apiUrl = `/api/jsonplaceholderUser/`;
    console.log(apiUrl);

    const fetchUserData = async () => {
      try {
        const response = await axios.post(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json", // リクエストのコンテンツタイプを指定
          },
        });

        if (response.status === 200) {
          const data = response.data;
          // データを使用する
          console.log(data);
        } else {
          console.error("API request failed");
        }
      } catch (error) {
        console.error("API request failed", error);
      }
    };

    // APIにアクセスしてユーザーデータを取得
    fetchUserData();
  }, []);
  return (
    <>
      <div>aaa</div>
    </>
  );
};

export default index;
