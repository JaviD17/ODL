import type { Component } from "solid-js";
import { createResource, createSignal, Show } from "solid-js";
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
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Heading
} from "@hope-ui/solid";

import { gql } from "@urql/core";
import { client } from "../App";

// const [createUser] = createResource(() =>
//   client
//     .mutation(
//       gql`
//         mutation ($name: String!, $email: String!, $password: String!) {
//           createUser(name: $name, email: $email, password: $password) {
//             id
//             name
//             email
//             password
//             role
//           }
//         }
//       `
//     )
//     .toPromise()
//     .then(({ data }) => console.log(data))
// );

// const onSignUp = async () => {
//   createUser();
// };

export const User: Component = () => {
  const [nameValue, setNameValue] = createSignal("");
  const [emailValue, setEmailValue] = createSignal("");
  const [passwordValue, setPasswordValue] = createSignal("");
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [userValues, setUserValues] = createSignal({ id: "", name: "" });

  const onSignUp = async () => {
    await client
      .mutation(
        gql`
          mutation ($name: String!, $email: String!, $password: String!) {
            createUser(name: $name, email: $email, password: $password) {
              id
              name
              email
              password
              role
            }
          }
        `,
        { name: nameValue(), email: emailValue(), password: passwordValue() }
      )
      .toPromise()
      .then(({ data }) => {
        // id = data ? data?.id : "";
        return data.createUser;
      });
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
  };
  const onLogIn = async () => {
    await client
      .mutation(
        gql`
          mutation ($email: String!, $password: String!) {
            authenticate(email: $email, password: $password) {
              id
              name
              email
              password
              posts {
                id
                title
                postedOn
                body
                authorId
                published
              }
              role
            }
          }
        `,
        { email: emailValue(), password: passwordValue() }
      )
      .toPromise()
      .then(({ data }) => {
        setUserValues({
          ...(data.authenticate && { id: data.authenticate.id }),
          ...(data.authenticate && { name: data.authenticate.name }),
        });
        return data.authenticate;
      });
    setEmailValue("");
    setPasswordValue("");
    setLoggedIn(true);
  };

  return (
    <>
      <Show when={!loggedIn()}>
        <Container centered my="$24" maxW="25%">
          <Box bg="$whiteAlpha6" padding="$10" rounded="$3xl">
            <Tabs colorScheme="accent" fitted variant="outline">
              <TabList>
                <Tab fontWeight="$bold">Sign Up</Tab>
                <Tab fontWeight="$bold">Log In</Tab>
              </TabList>
              <TabPanel>
                <FormControl required>
                  <FormLabel for="name">Name: {nameValue()}</FormLabel>
                  <Input
                    value={nameValue()}
                    onInput={(e) => setNameValue(e.currentTarget.value)}
                    variant="filled"
                    placeholder="Enter Name"
                    id="name"
                    type="name"
                  />
                  {/* <FormHelperText>We'll never share your name.</FormHelperText> */}
                </FormControl>
                <FormControl required mt="$6">
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
                  <FormLabel for="password">
                    Password: {passwordValue()}
                  </FormLabel>
                  <Input
                    value={passwordValue()}
                    onInput={(e) => setPasswordValue(e.currentTarget.value)}
                    variant="filled"
                    placeholder="Enter Password"
                    id="password"
                    type="text"
                  />
                  <FormHelperText>
                    We'll never share your password.
                  </FormHelperText>
                </FormControl>
                <Center mt="$6">
                  <Button colorScheme="accent" onClick={onSignUp}>
                    Sign Up
                  </Button>
                </Center>
              </TabPanel>
              <TabPanel>
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
                  <FormLabel for="password">
                    Password: {passwordValue()}
                  </FormLabel>
                  <Input
                    value={passwordValue()}
                    onInput={(e) => setPasswordValue(e.currentTarget.value)}
                    variant="filled"
                    placeholder="Enter Password"
                    id="password"
                    type="text"
                  />
                  <FormHelperText>
                    We'll never share your password.
                  </FormHelperText>
                </FormControl>
                <Center mt="$6">
                  <Button colorScheme="accent" onClick={onLogIn}>
                    Log In
                  </Button>
                </Center>
              </TabPanel>
            </Tabs>
          </Box>
        </Container>
      </Show>

      <Show when={loggedIn()}>
        <Container centered centerContent my="$24">
          <Heading level="1" size="4xl" color="$accent10">Welcome Back {userValues().name}</Heading>
        </Container>
      </Show>
    </>
  );
};
