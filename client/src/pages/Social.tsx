import { Component, For } from "solid-js";
import { Link } from "solid-app-router";
import { Container, Heading, HStack, Anchor } from "@hope-ui/solid";
import { IconGithub } from "../components/Icons/IconGithub";
import { IconLinkedin } from "../components/Icons/IconLinkedin";
import { IconInstagram } from "../components/Icons/IconInstagram";

export const Social: Component = () => {
  const links = [
    {
      icon: <IconGithub />,
      href: "https://github.com/JaviD17/ODL",
    },
    {
      icon: <IconLinkedin />,
      href: "https://linkedin.com/in/javier-dominguez-ii",
    },
    {
      icon: <IconInstagram />,
      href: "https://github.com/JaviD17/ODL",
    },
  ];
  return (
    <Container centerContent my="$20">
      <Heading level={1} fontSize="$6xl" fontWeight={"$bold"}>
        Social
      </Heading>
      <HStack spacing="20px" my="$10">
        <For each={links}>
          {(link) => (
            <Anchor
              as={Link}
              href={link.href}
              _hover={{ color: "$accent10" }}
              external
            >
              {link.icon}
            </Anchor>
          )}
        </For>
      </HStack>
    </Container>
  );
};
