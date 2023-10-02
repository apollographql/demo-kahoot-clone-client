import { Text, Flex, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      py={8}
      bg={"brand.summit"}
      color={"white"}
    >
      <Link to={`/`}>
        <Text fontSize="xl" fontWeight="bold" pl={8}>
          Subscriptions Kahoot
        </Text>
      </Link>
    </Flex>
  );
};

export default function Layout() {
  return (
    <Container minW="100vw" margin={0} padding={0}>
      <Flex direction="column" align="center">
        <Header />
        <Outlet />
      </Flex>
    </Container>
  );
}
