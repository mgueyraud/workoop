import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  id: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  id,
}) => {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      borderLeft="4px"
      borderStyle="solid"
      borderColor="chakra-border-color"
      display="flex"
      flexDirection="column"
    >
      <Heading fontSize={"2xl"} fontFamily={"body"}>
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.700", "gray.400")} mt={2}>
        {description}
      </Text>
      <ChakraLink
        as={Link}
        color={"blue.400"}
        mt="auto"
        pt={5}
        href={`/projects/${id}`}
      >
        <Text
          alignItems="center"
          color={"blue.400"}
          style={{ cursor: "pointer" }}
        >
          Ir al proyecto
        </Text>
      </ChakraLink>
    </Box>
  );
};

export default ProjectCard;
