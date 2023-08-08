import { InferGetStaticPropsType, NextPage } from "next";
import { client } from "../../libs/client";
import { Props, Blog } from "../../type/blogJamstack";
import styles from "../../styles/blogJamstack/index.module.scss";

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
  });

  // console.log(data);
  return {
    props: {
      blog: data,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });
  console.log(data);
  const paths = data.contents.map(
    (content: { id: string }) => `/blogJamstack/${content.id}`
  );
  return {
    paths,
    fallback: false,
  };
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={styles.body}
      ></div>
    </main>
  );
};

export default BlogId;
