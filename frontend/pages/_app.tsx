import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import NavbarLayout from "../layouts/NavbarLayout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ChakraProvider>
        <SessionProvider session={session}>
          <NavbarLayout>
            <Component {...pageProps} />
          </NavbarLayout>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
