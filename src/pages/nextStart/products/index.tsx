import Link from "next/link";
import styles from "../../../styles/nextStart/products/index.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>商品一覧</h2>
        <ul>
          <li>
            <Link href="/nextStart/products/smartphone">
              <a>スマートフォン</a>
            </Link>
          </li>
          <li>
            <Link href="/nextStart/products/pc">
              <a>PC</a>
            </Link>
          </li>
          <li>
            <Link href="/nextStart/products/headphone">
              <a>ヘッドフォン</a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default index;
