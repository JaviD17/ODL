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

export const BlogForm: Component = () => {
  const [title, setTitle] = createSignal("");
  const [postedOn, setPostedOn] = createSignal("");
  const [body, setBody] = createSignal("");
  const [authorId, setAuthorId] = createSignal("");
  const [error, setError] = createSignal(false);

  const onSubmit = async () => {
    if (title() == "" || postedOn() == "" || body() == "" || authorId() == "") {
      setError(true);
      console.log(error());
    }

    await client
      .mutation(
        gql`
          mutation (
            $title: String!
            $postedOn: String!
            $body: String!
            $authorId: ID!
          ) {
            createDraft(
              title: $title
              postedOn: $postedOn
              body: $body
              authorId: $authorId
            ) {
              id
              title
              postedOn
              body
              authorId
              published
            }
          }
        `,
        {
          title: title(),
          postedOn: postedOn(),
          body: body(),
          authorId: authorId(),
        }
      )
      .toPromise()
      .then(({ data }) => data.createDraft);

    setTitle("");
    setPostedOn("");
    setBody("");
    setAuthorId("");
  };

  return (
    <>
      <FormControl>
        <FormLabel for="title">Title</FormLabel>
        <Input
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          id="title"
          type="text"
          placeholder="Some Title"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="date">Date</FormLabel>
        <Input
          value={postedOn()}
          onInput={(e) => setPostedOn(e.currentTarget.value)}
          id="date"
          type="text"
          placeholder="Some Date"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="body">Body</FormLabel>
        <Textarea
          value={body()}
          onInput={(e) => setBody(e.currentTarget.value)}
          placeholder="Some Draft Content"
        />
      </FormControl>
      <FormControl>
        <FormLabel for="authorId">Author ID</FormLabel>
        <Input
          value={authorId()}
          onInput={(e) => setAuthorId(e.currentTarget.value)}
          id="authorId"
          type="text"
          placeholder="Author ID"
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
          Add Draft
        </Button>
      </Center>
    </>
  );
};
