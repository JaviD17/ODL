import type { Component } from "solid-js";
import {
  Box,
  Grid,
  GridItem,
  Image,
  Badge,
  Heading,
  Flex,
  Text,
  Spacer,
} from "@hope-ui/solid";

export const BlogCard: Component = () => {
  return (
    <Box
      maxW="$md"
      overflow="hidden"
      borderWidth="1px"
      borderColor="$neutral6"
      borderRadius="$lg"
    >
      <Image
        // boxSize="200px"
        src="src/assets/journal.jpg"
        alt="Journal"
        objectFit="cover"
        htmlWidth="400px"
        htmlHeight="200px"
      />
      <Flex mt="$4" mx="$4">
        <Badge colorScheme="accent" fontSize="$lg">
          Fitness
        </Badge>
        <Spacer />
        <Text textAlign="right" color="$neutral11">
          Posted June 12th, 2022
        </Text>
      </Flex>

      <Heading level="2" fontSize="$3xl" ml="$4" mt="$2">
        How To Cut 2022
      </Heading>
      <Grid templateColumns="repeat(3,1fr)" gap="$1" ml="$4" mb="$2">
        <GridItem colSpan={2} color="$neutral11">
          by Javier Dominguez II
        </GridItem>
      </Grid>
    </Box>
  );
};
