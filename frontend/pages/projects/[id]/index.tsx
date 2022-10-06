import { GetServerSideProps } from "next";
import verifyAuth from "../../../utilities/helpers/verifyAuth";
import { Project } from "../../../interfaces/Project";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function ProjectPage({
  project,
  isSignedOut,
}: {
  project?: Project;
  isSignedOut?: boolean;
}) {
  const router = useRouter();
  useEffect(() => {
    if (isSignedOut) signOut();
  }, [isSignedOut]);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading>{project?.titulo}</Heading>
          <Heading as="h2" size="sm">
            {project?.descripcion}
          </Heading>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Settings"
            icon={<FiSettings />}
            variant="outline"
          />
          <MenuList>
            <MenuItem
              command="⌘R"
              onClick={() => router.push(`/projects/${project?.id}/roles`)}
            >
              Roles
            </MenuItem>
            <MenuItem
              command="⌘P"
              onClick={() => router.push(`/projects/${project?.id}/persons`)}
            >
              Personas
            </MenuItem>
            <MenuItem
              command="⌘⇧C"
              onClick={() =>
                router.push(`/projects/${project?.id}/configuration`)
              }
            >
              Configuracion
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Tabs mt={10}>
        <TabList>
          <Tab>Backlog</Tab>
          <Tab>Tablero</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Tareas</p>
          </TabPanel>
          <TabPanel>
            <p>Tablero</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  const id = request.params?.id;

  const res = await fetch(`${process.env.BACKEND_API}/projects/${id}`, {
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

  return { props: { project: data } };
};
