import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "../../styles/nextTypescript/index.module.css";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

type SerchCatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type IndexPageProps = {
  initialCatImageURL: string;
};

const fetchCatImage = async (): Promise<SerchCatImage> => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search`);
  const data = await res.json();
  // console.log(data[0]);
  return data[0];
};

const index: NextPage<IndexPageProps> = ({ initialCatImageURL }) => {
  const [catImageUrl, setcatImageUrl] = useState(initialCatImageURL);
  const [isLoading, setisLoading] = useState(false);

  const handleClick = async () => {
    setisLoading(true);
    const catImage = await fetchCatImage();
    // console.log(catImage.url);
    setcatImageUrl(catImage.url);
    setisLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像アプリ</h1>
      {isLoading ? (
        <Loader active size="huge" inline="centered" />
      ) : (
        <img src={catImageUrl} width={500} height="auto" />
      )}
      <button style={{ marginTop: 18 }} onClick={() => handleClick()}>
        今日の猫さん
      </button>
    </div>
  );
};

// SSR（サーバーサイドでデータ取得）
export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  console.log(catImage);
  return {
    props: {
      initialCatImageURL: catImage.url,
    },
  };
};

export default index;

// 参考
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t
