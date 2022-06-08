import { Anchor, Container, Grid, GridItem, Center } from "@hope-ui/solid";
import { Component, For } from "solid-js";

const links = [
  { name: "Home" },
  { name: "Shop" },
  { name: "Blog" },
  { name: "About" },
  { name: "Contact" },
];

export const Nav: Component = () => {
  return (
    <>
      <Grid templateColumns="repeat(9, 1fr)" gap="$1" fontWeight="$bold">
        <GridItem fontSize="$2xl" color="$pr1" colSpan={2}>
          <Center>
            <Anchor>Logo</Anchor>
          </Center>
        </GridItem>
        <GridItem colStart={3} colEnd={8}>
          <Grid templateColumns="repeat(5, 1fr)" gap="$1">
            <For each={links}>
              {(link) => (
                <GridItem fontSize="$md" color="$pr1" pt="$1_5">
                  <Center>
                    <Anchor>{link.name}</Anchor>
                  </Center>
                </GridItem>
              )}
            </For>
          </Grid>
        </GridItem>
        <GridItem fontSize="$xl" color="$pr1" colStart={8} colEnd={10}>
          <Center>
            <Anchor>Sign Up</Anchor>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
};
