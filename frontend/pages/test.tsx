import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// https://stackoverflow.com/questions/71885441/next-js-getserversideprops-is-not-working-using-docker

const Products: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Test</main>
      <p>{data.message}</p>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.BACKEND_API as string);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Products;
