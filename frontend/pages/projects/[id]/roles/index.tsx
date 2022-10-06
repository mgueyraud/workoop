import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import verifyAuth from "../../../../utilities/helpers/verifyAuth";
import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RolesPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading>Roles</Heading>
        <Link href={`/projects/${id}/roles/new`}>Crear</Link>
      </Flex>
      <TableContainer mt={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Permisos</Th>
              <Th isNumeric># Personas</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>bla bla bla bla bla bla bla</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  return { props: {} };
};
