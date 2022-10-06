import type { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import verifyAuth from "../utilities/helpers/verifyAuth";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Navbar from "../partials/Navbar";
import ProjectCard from "../components/ProjectCard";
import { Project } from "../interfaces/Project";
import { useEffect } from "react";

const Dashboard = ({
  projects,
  isSignedOut,
}: {
  projects?: Project[];
  isSignedOut?: boolean;
}) => {
  useEffect(() => {
    if (isSignedOut) signOut();
  }, [isSignedOut]);

  return (
    <>
      <Heading mb={8}>Tus proyectos</Heading>
      <Flex gap={10} flexWrap="wrap">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.titulo}
            description={project.descripcion}
          />
        ))}
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  const res = await fetch(`${process.env.BACKEND_API}/projects`, {
    headers: {
      Authorization: `Bearer ${authResponse.session.accessToken}`,
    },
  });

  const data = await res.json();

  if (data.code && data.code === "token_not_valid") {
    return {
      props: {
        isSignedOut: true,
      },
    };
  }

  return { props: { projects: data } };
};

export default Dashboard;
