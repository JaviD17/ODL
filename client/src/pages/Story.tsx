import type { Component } from "solid-js";
import { Container, Box, Heading, Text } from "@hope-ui/solid";

export const Story: Component = () => {
  return (
    <Container centerContent my="$20">
      <Heading level={1} fontSize="$6xl" fontWeight={"$bold"}>Our Story</Heading>
      <Box>
        <Text>We built ODL around...</Text>
      </Box>
    </Container>
  );
};
