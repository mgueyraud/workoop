import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  getSession,
  GetSessionParams,
} from "next-auth/react";
// https://stackoverflow.com/questions/71885441/next-js-getserversideprops-is-not-working-using-docker
import GoogleButton from "../components/GoogleButton";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { NextRequest } from "next/server";

const Home = ({
  providers,
}: {
  providers: Awaited<ReturnType<typeof getProviders>>;
}) => {
  const { data, status } = useSession();

  return (
    <div>
      {status === "loading" ? (
        <Center p={8} height="100vh">
          <Heading as="h5">Loading...</Heading>
        </Center>
      ) : null}
      {status === "unauthenticated" ? (
        <Center p={8} height="100vh">
          <Flex direction="column" alignItems="center">
            <Heading>Workoop</Heading>
            <Box h="10" />
            <GoogleButton onClick={() => signIn(providers?.google.id)} />
          </Flex>
        </Center>
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

export const getServerSideProps: GetServerSideProps = async (request) => {
  const providers = await getProviders();

  const session = await getSession(request);

  if (session?.user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: true,
      },
    };
  }

  return {
    props: { providers },
  };
};

export default Home;
