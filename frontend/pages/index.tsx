import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// https://stackoverflow.com/questions/71885441/next-js-getserversideprops-is-not-working-using-docker

const Home: NextPage<{ posts: any }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://backend:8000/api");

  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Home;