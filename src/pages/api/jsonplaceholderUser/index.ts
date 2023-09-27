import axios from "axios";

export default async (req, res) => {
  const requestData = req.body;

  try {
    // 固定のスラッグを使用してAPIにリクエストを送信
    const response = await axios.get(
      // `https://jsonplaceholder.typicode.com/comments?postId=${requestData.key1}`
      `https://jsonplaceholder.typicode.com/comments?postId=${requestData.key2}`
    );

    if (response.status === 200) {
      const data = response.data;
      // データをクライアントに返す
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ error: "API request failed" });
    }
  } catch (error) {
    console.error("API request failed", error);
    res.status(500).json({ error: "API request failed" });
  }
};
