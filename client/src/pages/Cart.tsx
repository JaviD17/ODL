import { Container, VStack, Heading, Box, Text } from "@hope-ui/solid";
import type { Component } from "solid-js";

export const Cart: Component = () => {
  return (
    <Container centered my="$20">
      <Heading level={1} fontSize="$6xl" fontWeight="$bold">
        Cart
      </Heading>
      <VStack spacing="24px">
        <Box
          width="100%"
          borderWidth="1px"
          borderColor="$neutral6"
          borderRadius="$lg"
        >
          <Heading level={2} fontSize="$2xl" m="$6">
            Lifestyle Short Sleeve
          </Heading>
          <Text m="$6">Quantity: 2</Text>
        </Box>
        <Box
          width="100%"
          borderWidth="1px"
          borderColor="$neutral6"
          borderRadius="$lg"
        >
          <Heading level={2} fontSize="$2xl" m="$6">
            Lifestyle Short Sleeve
          </Heading>
          <Text m="$6">Quantity: 2</Text>
        </Box>
        <Box
          width="100%"
          borderWidth="1px"
          borderColor="$neutral6"
          borderRadius="$lg"
        >
          <Heading level={2} fontSize="$2xl" m="$6">
            Lifestyle Short Sleeve
          </Heading>
          <Text m="$6">Quantity: 2</Text>
        </Box>
      </VStack>
    </Container>
  );
};
