import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
// https://stackoverflow.com/questions/71885441/next-js-getserversideprops-is-not-working-using-docker

const Home: NextPage = () => {
  const { data, status } = useSession();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === "loading" ? <p>Loading...</p> : null}
      {status === "unauthenticated" ? (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Login</button>
        </>
      ) : null}
      {status === "authenticated" ? (
        <>
          Signed in as {data.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : null}
    </div>
  );
};

export default Home;
