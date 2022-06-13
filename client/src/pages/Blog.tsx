import { Component, createResource, For } from "solid-js";
import { Center, Container, Grid, GridItem, Heading, Box, Flex } from "@hope-ui/solid";
import { createClient, gql } from "@urql/core";
import { BlogCard } from "../components/BlogCard";
import { BlogModal } from "../components/BlogModal";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

const [blogs, { refetch }] = createResource(() =>
  client
    .query(
      gql`
        query {
          drafts {
            id
            title
            postedOn
            body
            authorId
            published
          }
        }
      `
    )
    .toPromise()
    .then(({ data }) => data.drafts)
);

export const Blog: Component = () => {
  type Blog = {
    id: string;
    title: string;
    postedOn: string;
    body: string;
    authorId: string;
    published: string;
  };
  return (
    <Container centered centerContent my="$20">
      <Grid templateColumns="repeat(3,1fr)" width="100%" mb="$4">
        <GridItem colStart={2} colEnd={3}>
          <Flex justifyContent={"center"} alignItems={"flex-end"}>
            <Heading level={1} fontSize="$6xl">
              Blog
            </Heading>
          </Flex>
        </GridItem>
        <GridItem colStart={3}>
          <Flex justifyContent={"flex-end"} alignItems={"center"} h="100%">
            <BlogModal />
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3,1fr)" columnGap="$10" rowGap="$20">
        <For each={blogs()}>
          {(blog: Blog) => (
            <GridItem>
              <BlogCard blog={blog} />
            </GridItem>
          )}
        </For>
      </Grid>
    </Container>
  );
};
