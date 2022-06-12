import type { Component } from "solid-js";
import { Container, Grid, GridItem, Heading } from "@hope-ui/solid";
import { BlogCard } from "../components/BlogCard";

export const Blog: Component = () => {
  return (
    <Container centered centerContent my="$20">
      <Heading level={1} fontSize="$6xl" mb="$16">
        Blog
      </Heading>
      <Grid templateColumns="repeat(3,1fr)" columnGap="$10" rowGap="$20">
        <GridItem>
          <BlogCard />
        </GridItem>
        <GridItem>
          <BlogCard />
        </GridItem>
        <GridItem>
          <BlogCard />
        </GridItem>
        <GridItem>
          <BlogCard />
        </GridItem>
        <GridItem>
          <BlogCard />
        </GridItem>
      </Grid>
    </Container>
  );
};
