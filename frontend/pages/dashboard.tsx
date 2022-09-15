import type { GetServerSideProps, NextPage } from "next";
import { signOut } from "next-auth/react";
import verifyAuth from "../utilities/helpers/verifyAuth";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Navbar from "../partials/Navbar";
import ProjectCard from "../components/ProjectCard";

const Dashboard = () => {
  return (
    <>
      <Heading mb={8}>Tus proyectos</Heading>
      <Flex gap={10} flexWrap="wrap">
        <ProjectCard
          title="Titulo 1a a sd asd as d  asdasd as d as da sd"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
        <ProjectCard
          title="Titulo 1"
          description="asdasdasdasdasd asdasd asd a sda"
        />
      </Flex>
    </>
  );
};

export async function getServerSideProps(request: GetServerSideProps) {
  return verifyAuth(request);
}

export default Dashboard;
