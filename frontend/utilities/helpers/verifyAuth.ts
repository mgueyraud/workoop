import { GetServerSideProps } from "next";
import { getSession, GetSessionParams } from "next-auth/react";

export default async function vertifyAuth(request: GetServerSideProps){
  const session = await getSession(request as GetSessionParams);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return { props: {} };
}