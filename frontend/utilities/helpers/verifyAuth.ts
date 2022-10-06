import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default async function vertifyAuth(request: GetServerSidePropsContext){
  const session = await getSession(request);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return { session };
}