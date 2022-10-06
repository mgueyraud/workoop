import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import verifyAuth from "../../../../utilities/helpers/verifyAuth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewRole() {
  const router = useRouter();
  const { id } = router.query;
  const [radioValue, setRadioValue] = useState("1");

  return (
    <>
      <Heading>Nuevo rol</Heading>
      <form>
        <Box mt={10} mb={10}>
          <FormControl isRequired>
            <FormLabel htmlFor="nombre">Nombre del rol</FormLabel>
            <Input placeholder="Developer" id="nombre" name="nombre" />
          </FormControl>
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <Stack>
              <Radio value="1">First</Radio>
              <Radio value="2">Second</Radio>
              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Flex>
          <Button type="submit" ml="auto">
            Crear
          </Button>
        </Flex>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  return { props: {} };
};
