import { Anchor, Container, Grid, GridItem, Center, Button } from "@hope-ui/solid";
import { Component, For } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";
import { Home } from "../pages/Home";
import { Blog } from "../pages/Blog";
import { Calc } from "../pages/Calc";
import { Shop } from "../pages/Shop";
import { Story } from "../pages/Story";
import { Social } from "../pages/Social";
import { User } from "../pages/User";

const links = [
  { name: "Shop", href: "shop" },
  { name: "Calc", href: "calc" },
  { name: "Blog", href: "blog" },
  { name: "Story", href: "story" },
  { name: "Social", href: "social" },
];

export const Nav: Component = () => {
  return (
    <>
      <Grid
        templateColumns="repeat(9, 1fr)"
        gap="$1"
        fontWeight="bold"
        mt="$8"
      >
        <GridItem fontSize="$3xl" colSpan={2}>
          <Center>
            <Anchor as={Link} href="/" _hover={{ color: "$pr1" }}>
              ODL
            </Anchor>
          </Center>
        </GridItem>
        <GridItem colStart={3} colEnd={8} pt="$2">
          <Grid templateColumns="repeat(5, 1fr)" gap="$1">
            <For each={links}>
              {(link) => (
                <GridItem fontSize="$lg">
                  <Center>
                    <Anchor
                      as={Link}
                      href={`/${link.href}`}
                      _hover={{ color: "$pr1" }}
                    >
                      {link.name}
                    </Anchor>
                  </Center>
                </GridItem>
              )}
            </For>
          </Grid>
        </GridItem>
        <GridItem colStart={8} colEnd={10}>
          <Center>
            <Button fontWeight="bold" colorScheme="accent" variant="outline" size="lg" as={Link} href="/user">
              Log In
            </Button>
          </Center>
        </GridItem>
      </Grid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/calc" element={<Calc />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/story" element={<Story />} />
        <Route path="/social" element={<Social />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
};
