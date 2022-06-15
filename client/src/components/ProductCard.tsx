import {
  Box,
  Grid,
  GridItem,
  Image,
  Badge,
  Heading,
  Flex,
  Text,
  Anchor,
} from "@hope-ui/solid";
import { Link } from "solid-app-router";

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

export const ProductCard = (props: { product: Product }) => {
  const { product } = props;
  let colors = product.color.split(", ");
  console.log(colors);

  return (
    <Box
      maxW="$md"
      overflow="hidden"
      borderWidth="1px"
      borderColor="$neutral6"
      borderRadius="$lg"
    >
      <Image
        // boxSize="300px"
        src="src/assets/shortSleeve.jpg"
        alt="Short Sleeve Shirt"
        objectFit="cover"
        htmlWidth="300px"
        htmlHeight="400px"
      />
      <Heading level="2" fontSize="$xl" mx="$4" mt="$2">
        <Anchor
          as={Link}
          href={`${product.id}`}
          _hover={{ color: "$accent10" }}
        >
          {product.title}
        </Anchor>
      </Heading>
      <Text color="$neutral11" mx="$4" my="$2">
        ${product.price}
      </Text>
    </Box>
  );
};
