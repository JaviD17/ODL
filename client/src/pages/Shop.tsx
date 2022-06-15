import type { Component } from "solid-js";
import { For, createResource } from "solid-js";
import { Container, Grid, GridItem, Heading, Flex } from "@hope-ui/solid";
import { BlogCard } from "../components/BlogCard";
import { BlogModal } from "../components/BlogModal";
import { createClient, gql } from "@urql/core";
import { ProductCard } from "../components/ProductCard";
import { ProductModal } from "../components/ProductModal";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

const [products, { refetch }] = createResource(() =>
  client
    .query(
      gql`
        query {
          products {
            id
            collection
            type
            title
            body
            price
            size
            color
          }
        }
      `
    )
    .toPromise()
    .then(({ data }) => data.products)
);

export const Shop: Component = () => {
  type Product = {
    id: string;
    collection: string;
    type: string;
    title: string;
    body: string;
    price: string;
    size: string;
    color: string;
  };
  
  return (
    <Container centerContent my="$20">
      <Grid templateColumns="repeat(3,1fr)" width="100%" mb="$4">
        <GridItem colStart={2} colEnd={3}>
          <Flex justifyContent={"center"} alignItems={"flex-end"}>
            <Heading level={1} fontSize="$6xl" fontWeight={"$bold"}>
              Shop
            </Heading>
          </Flex>
        </GridItem>
        <GridItem colStart={3}>
          <Flex justifyContent={"flex-end"} alignItems={"center"} h="100%">
            <ProductModal />
          </Flex>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3,1fr)" columnGap="$10" rowGap="$20">
        <For each={products()}>
          {(product: Product) => (
            <GridItem>
              <ProductCard product={product} />
            </GridItem>
          )}
        </For>
      </Grid>
    </Container>
  );
};
