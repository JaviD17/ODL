import { Container, Heading } from "@hope-ui/solid";
import type { Component } from "solid-js";

export const Cart: Component = () => {
  return (
    <Container centerContent my="$20">
      <Heading level={1} fontSize="$6xl" fontWeight="$bold">
        Cart
      </Heading>
    </Container>
  );
};
