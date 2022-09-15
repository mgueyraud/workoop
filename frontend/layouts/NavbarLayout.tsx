import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../partials/Navbar";
import { useSession } from "next-auth/react";

export default function NavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? <Navbar /> : null}
      <main>
        <Box p={4}>{children}</Box>
      </main>
    </>
  );
}
