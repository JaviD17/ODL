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
  Anchor,
} from "@hope-ui/solid";

import { Link } from "solid-app-router";

type Blog = {
  id: string;
  title: string;
  postedOn: string;
  body: string;
  authorId: string;
  published: string;
};

export const BlogCard = (props: { blog: Blog }) => {
  const { blog } = props;
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
          Posted {blog.postedOn}
        </Text>
      </Flex>

      <Heading level="2" fontSize="$3xl" ml="$4" mt="$2">
        <Anchor as={Link} href={`${blog.id}`} _hover={{ color: "$accent10" }}>
          {blog.title}
        </Anchor>
      </Heading>
      <Grid templateColumns="repeat(3,1fr)" gap="$1" ml="$4" mb="$2">
        <GridItem colSpan={2} color="$neutral11">
          by Javier Dominguez II
        </GridItem>
      </Grid>
    </Box>
  );
};
