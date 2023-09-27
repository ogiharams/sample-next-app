import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  const pagesInfo = [
    { pageName: "ポケモン", path: "pokemon" },
    { pageName: "foodDelivery", path: "foodDelivery" },
    { pageName: "rtkTasks", path: "rtkTasks" },
    { pageName: "rtkBasic", path: "rtkBasic" },
    { pageName: "rtlLesson", path: "rtlLesson" },
    { pageName: "rtkQuery", path: "rtkQuery" },
    { pageName: "materialUi", path: "materialUi" },
    { pageName: "blogJamstack", path: "blogJamstack" },
    { pageName: "nextStart", path: "nextStart/products" },
    { pageName: "nextTypescript", path: "nextTypescript" },
    { pageName: "socket", path: "socket" },
    { pageName: "typeScript", path: "typeScript" },
    { pageName: "HLS", path: "hls" },
    { pageName: "WAV", path: "wav" },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Development-List</h1>
        {pagesInfo.map((pageInfo) => (
          <ul key={pageInfo.pageName}>
            <li>
              <Link href={pageInfo.path}>
                <a>{pageInfo.pageName}</a>
              </Link>
            </li>
          </ul>
        ))}
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
