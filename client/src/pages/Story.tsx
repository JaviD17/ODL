import type { Component } from "solid-js";
import { Link } from "solid-app-router";
import {
  Container,
  Box,
  Heading,
  Text,
  Anchor,
  Button,
  Center,
} from "@hope-ui/solid";
import { IconInstagram } from "../components/Icons/IconInstagram";

export const Story: Component = () => {
  return (
    <Container centerContent my="$20">
      <Heading level={1} fontSize="$6xl" fontWeight={"$bold"}>
        Our Story
      </Heading>
      <Box>
        <Text my="$2">We built ODL around...</Text>

        <Center>
          <Button
            fontWeight="bold"
            colorScheme="accent"
            variant="subtle"
            size="lg"
            as={Link}
            href="/social"
            my="$2"
          >
            Go To Socials
          </Button>
        </Center>
      </Box>
    </Container>
  );
};
