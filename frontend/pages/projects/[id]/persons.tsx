import { GetServerSideProps } from "next";
import verifyAuth from "../../../utilities/helpers/verifyAuth";

export default function ProjectPage() {
  return <>Persons</>;
}

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  return { props: {} };
};
