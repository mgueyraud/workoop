import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import verifyAuth from "../../utilities/helpers/verifyAuth";

export default function NewProject() {
  const { data } = useSession();
  const router = useRouter();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      fechaInicio: new Date(),
      fechaFin: new Date(),
    },
    onSubmit: ({ nombre, fechaFin, fechaInicio, descripcion }) => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/projects/`,
          {
            titulo: nombre,
            descripcion,
            fecha_fin: fechaFin,
            fecha_inicio: fechaInicio,
          },
          {
            headers: {
              Authorization: `Bearer ${data?.accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            toast({
              title: "Proyecto creado",
              description: "El proyecto se ha creado exitosamente!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });

            router.push("/dashboard");
          }
        });
    },
  });

  return (
    <Container maxW="container.lg">
      <Heading mb={8}>Nuevo Proyecto</Heading>
      <form onSubmit={formik.handleSubmit}>
        <Box mt={10} mb={10}>
          <FormControl isRequired>
            <FormLabel htmlFor="nombre">Nombre del proyecto</FormLabel>
            <Input
              placeholder="Workoop"
              id="nombre"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="descripcion">
              Descripcion del proyecto
            </FormLabel>
            <Textarea
              placeholder="Este proyecto se trata de ..."
              id="descripcion"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="fechaInicio">Fecha inicio</FormLabel>
            <Input
              id="fechaInicio"
              name="fechaInicio"
              type="date"
              value={String(formik.values.fechaInicio)}
              onChange={formik.handleChange}
            />
          </FormControl>
          <FormControl isRequired mt={5}>
            <FormLabel htmlFor="fechaFin">Fecha Fin</FormLabel>
            <Input
              id="fechaFin"
              name="fechaFin"
              type="date"
              value={String(formik.values.fechaFin)}
              onChange={formik.handleChange}
            />
          </FormControl>
        </Box>
        <Flex>
          <Button type="submit" ml="auto">
            Crear
          </Button>
        </Flex>
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (request) => {
  const authResponse = await verifyAuth(request);

  if (authResponse.redirect) return authResponse;

  return { props: {} };
};
