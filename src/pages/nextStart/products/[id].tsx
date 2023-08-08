import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/nextStart/products/index.module.css";
import headPhoneData from "../../../../public/nextStart/headPhone.json";
import pcData from "../../../../public/nextStart/pc.json";
import smartPhoneData from "../../../../public/nextStart/smartPhone.json";
import { NextPage } from "next";

type HEADPHONEDATA = typeof headPhoneData;
type PCDATA = typeof pcData;
type SMARTPHONEDATA = typeof smartPhoneData;

type Product = {
  product: {
    id: string;
    name: string;
    image: string;
  };
};

type Params = {
  id: string;
  name: string;
  image: string;
};

// //SSG
// export const getStaticProps = async ({ params }: any) => {
//   const req = await fetch(`http://localhost:3000/nextStart/${params.id}.json`);
//   const data = await req.json();
//   console.log(data);

//   return {
//     props: {
//       product: data,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const req = await fetch(`http://localhost:3000/nextStart/products.json`);
//   const data = await req.json();

//   const paths = data.map((product: string) => {
//     return {
//       params: {
//         id: product,
//       },
//     };
//   });
//   // console.log(paths);
//   return {
//     paths,
//     // pathで設定していないものはnot found
//     fallback: false,
//   };
// };

// SSR
export const getServerSideProps = async ({ params }: any) => {
  const req = await fetch(`http://localhost:3000/nextStart/${params.id}.json`);
  const data = await req.json();
  console.log(data);

  return {
    props: {
      product: data,
    },
  };
};

const Product: NextPage<Product> = ({ product }) => {
  const router = useRouter();
  // console.log(router);
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{id}のページです</h1>
        <img src={product.image} width="300" height="400" />
        <p>{product.name}</p>
        <br />
        <Link href="/nextStart/products">
          <a>商品一覧へ</a>
        </Link>
      </main>
    </div>
  );
};

export default Product;
