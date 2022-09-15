import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

type ProjectCardProps = {
  title: string;
  description: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
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
      <Link href={"#"} color={"blue.400"} mt="auto">
        <Flex alignItems="center">Ir al proyecto</Flex>
      </Link>
    </Box>
  );
};

export default ProjectCard;
