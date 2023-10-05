import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  ListItem,
  Link,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export default function MainPage() {
  return (
    <Container
      maxW="800px"
      minH="500px"
      margin={0}
      padding={0}
      p={16}
      borderRadius="lg"
    >
      <Text>
        Welcome to{" "}
        <Link href="https://summit.graphql.com" isExternal>
          GraphQL Summit 2023
        </Link>
        ! 🌴 You're in the client demo app for the workshop "Federated
        Subscriptions in GraphOS".
      </Text>
      <br />
      <Text>Here are some quick links for your reference:</Text>
      <UnorderedList>
        <ListItem>
          <Link
            href="https://github.com/apollographql/demo-kahoot-clone-client"
            isExternal
          >
            GitHub repo - client
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://github.com/apollographql/demo-kahoot-clone-supergraph"
            isExternal
          >
            GitHub repo - supergraph
          </Link>
        </ListItem>
      </UnorderedList>
      <br />
      <Button colorScheme="orange">
        <RouterLink to={`join-quiz`}>Get started</RouterLink>
      </Button>
    </Container>
  );
}
