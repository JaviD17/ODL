import type { Component } from "solid-js";
import { createResource, createSignal, For } from "solid-js";
import { createClient, gql } from "@urql/core";
import { Box, Container } from "@hope-ui/solid";

// import components
import { Nav } from "./components/Nav";

export const client = createClient({
  url: "http://localhost:4000/graphql",
});

interface Post {
  id: string;
  title: string;
  body: string;
  published: boolean;
}

const [drafts, { refetch }] = createResource(() =>
  client
    .query(
      gql`
        query {
          drafts {
            id
            title
            body
            published
          }
        }
      `
    )
    .toPromise()
    .then(({ data }) => data.drafts)
);

const App: Component = () => {
  const [title, setTitle] = createSignal("");
  const [body, setBody] = createSignal("");

  const onAdd = async () => {
    await client
      .mutation(
        gql`
          mutation ($title: String!, $body: String!) {
            createDraft(title: $title, body: $body) {
              id
              title
              body
              published
            }
          }
        `,
        { title: title(), body: body() }
      )
      .toPromise()
      .then(({ data }) => console.log(data.createDraft));
    refetch();
    setTitle("");
    setBody("");
  };

  return (
    <>
      <Nav />
      <Container centerContent>
        <Box m="$2" fontSize="$2xl">
          Obsessed Demon Labz
        </Box>
      </Container>
      <Container centerContent>
        <Box m="$2" fontSize="$2xl">
          <For each={drafts()}>
            {(post: Post) => (
              <div>
                <p>
                  {post.title} : {post.body}
                </p>
              </div>
            )}
          </For>
          <div>{title()}</div>
          <div>
            <label for="title">Title</label>
            <input
              type="text"
              value={title()}
              oninput={(e) => setTitle(e.currentTarget.value)}
              name="title"
            />
            <label for="body">Body</label>
            <input
              type="text"
              value={body()}
              oninput={(e) => setBody(e.currentTarget.value)}
              name="body"
            />
          </div>
          <button onclick={onAdd}>Add</button>
        </Box>
      </Container>
    </>
  );
};

export default App;
