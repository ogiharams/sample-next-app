import { useState } from "react";
import io from "socket.io-client";
import styles from "../../styles/socket/index.module.css";

const socket = io("http://localhost:3100");

const index = () => {
  const [message, setMessage] = useState("");
  const [list, setLitst] = useState([]);

  const handleSendMessage = () => {
    // サーバーへ送信
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  // サーバーから受信
  socket.on("received_message", (data) => {
    console.log("サーバーから受信データ", data);
    setLitst([...list, data]);
    console.log("追加後データ", data);
  });

  return (
    <div>
      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input
            type="text"
            placeholder="チャット・・・"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button onClick={handleSendMessage}>チャット送信</button>
        </div>
        {list.map((chat) => (
          <div className={styles.chatArea} key={chat.message}>
            {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
