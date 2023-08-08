import { InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import { client } from "../../libs/client";
import { Props } from "../../type/blogJamstack";
import styles from "../../styles/blogJamstack/index.module.scss";

// SSG
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  // console.log(data.contents);
  return {
    props: {
      blog: data.contents,
    },
  };
};

const index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  return (
    <div>
      {blog.map((blog) => (
        <li key={blog.id}>
          <Link href={`blogJamstack/${blog.id}`}>
            <a href="">{blog.title}</a>
          </Link>
        </li>
      ))}
    </div>
  );
};

export default index;
// https://www.youtube.com/watch?v=dNpONz4Yi04&list=PLT5klp7W4r8T0sf5EbgOtkna44hHgVxae&index=5
// vercelへのデプロイはまだだよ
