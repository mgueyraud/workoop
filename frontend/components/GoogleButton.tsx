import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text, ButtonProps } from "@chakra-ui/react";

export default function GoogleButton(props: ButtonProps) {
  return (
    <Button
      w={"full"}
      maxW={"md"}
      variant={"outline"}
      leftIcon={<FcGoogle />}
      {...props}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
}
