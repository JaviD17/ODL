import { Component, createSignal } from "solid-js";
import {
  Center,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Button,
} from "@hope-ui/solid";

export const User: Component = () => {
  const [emailValue, setEmailValue] = createSignal("");
  const [passwordValue, setPasswordValue] = createSignal("");

  return (
    <Container centered my="$20" maxW="25%">
      <Box bg="$whiteAlpha6" padding="$10" rounded="$3xl">
        <FormControl required>
          <FormLabel for="email">Email: {emailValue()}</FormLabel>
          <Input
            value={emailValue()}
            onInput={(e) => setEmailValue(e.currentTarget.value)}
            variant="filled"
            placeholder="Enter Email"
            id="email"
            type="email"
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl required mt="$6">
          <FormLabel for="password">Password: {passwordValue()}</FormLabel>
          <Input
            value={passwordValue()}
            onInput={(e) => setPasswordValue(e.currentTarget.value)}
            variant="filled"
            placeholder="Enter Password"
            id="password"
            type="text"
          />
          <FormHelperText>We'll never share your password.</FormHelperText>
        </FormControl>
        <Center mt="$6">
          <Button colorScheme="accent">Log In</Button>
        </Center>
      </Box>
    </Container>
  );
};
