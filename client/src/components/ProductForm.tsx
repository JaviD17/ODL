import type { Component } from "solid-js";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  Center,
  Text,
} from "@hope-ui/solid";
import { createSignal, Show } from "solid-js";
import { createClient, gql } from "@urql/core";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

export const ProductForm: Component = () => {
  const [collection, setCollection] = createSignal("");
  const [type, setType] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [body, setBody] = createSignal("");
  const [price, setPrice] = createSignal("");
  const [size, setSize] = createSignal("");
  const [color, setColor] = createSignal("");
  const [error, setError] = createSignal(false);

  const onSubmit = async () => {
    if (
      collection() == "" ||
      type() == "" ||
      title() == "" ||
      body() == "" ||
      price() == "" ||
      size() == "" ||
      color() == ""
    ) {
      setError(true);
      console.log(error());
    }

    await client
      .mutation(
        gql`
          mutation (
            $collection: String!
            $type: String!
            $title: String!
            $body: String!
            $price: String!
            $size: String!
            $color: String!
          ) {
            createProduct(
              collection: $collection
              type: $type
              title: $title
              body: $body
              price: $price
              size: $size
              color: $color
            )
          }
        `,
        {
          collection: collection(),
          type: type(),
          title: title(),
          body: body(),
          price: price(),
          size: size(),
          color: color(),
        }
      )
      .toPromise()
      .then(({ data }) => data.createProduct);

    setCollection("");
    setType("");
    setTitle("");
    setBody("");
    setPrice("");
    setSize("");
    setColor("");
  };

  return (
    <>
      <FormControl>
        <FormLabel for="collection">Collection</FormLabel>
        <Input
          value={collection()}
          onInput={(e) => setCollection(e.currentTarget.value)}
          id="collection"
          type="text"
          placeholder="Collection Name"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="type">Type</FormLabel>
        <Input
          value={type()}
          onInput={(e) => setType(e.currentTarget.value)}
          id="collection"
          type="text"
          placeholder="'Short Sleeve, 'Long Sleeve', 'Tank', etc"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="title">title</FormLabel>
        <Input
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          id="title"
          type="text"
          placeholder="Title Name"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="body">Body</FormLabel>
        <Textarea
          value={body()}
          onInput={(e) => setBody(e.currentTarget.value)}
          placeholder="Body Description"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="price">Price</FormLabel>
        <Input
          value={price()}
          onInput={(e) => setPrice(e.currentTarget.value)}
          id="price"
          type="text"
          placeholder="28.99"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="size">Size</FormLabel>
        <Input
          value={size()}
          onInput={(e) => setSize(e.currentTarget.value)}
          id="size"
          type="text"
          placeholder="'XSmall', 'Small', 'Medium', 'Large', 'XLarge', 'XXLarge',"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="color">Color</FormLabel>
        <Input
          value={color()}
          onInput={(e) => setColor(e.currentTarget.value)}
          id="color"
          type="text"
          placeholder="Black, White, Sand, Navy"
        />
      </FormControl>
      <Show when={error()}>
        <Center>
          <Text color="$danger10" mt="$2">
            All Fields Required. Try Again.
          </Text>
        </Center>
      </Show>
      <Center>
        <Button onClick={onSubmit} mt="$4" colorScheme="accent">
          Add Product
        </Button>
      </Center>
    </>
  );
};

// collection
// type
// title
// body
// price
// size
// color
