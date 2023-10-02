import {
  Button,
  Flex,
  Text,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function QuizHeader({ quizId }) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      mb={8}
      mt={4}
      px={6}
      pb={3}
      borderBottom="2px dashed"
      borderColor="orange.600"
      wrap="wrap"
    >
      <Text fontSize={"md"}>
        Playing as: {localStorage.getItem("playername")}
      </Text>
      <Spacer />
      <ChakraLink as={Link} to={`/leaderboard/${quizId}`} target="_blank">
        <Button variant="outline" colorScheme="orange">
          Leaderboard
        </Button>
      </ChakraLink>
    </Flex>
  );
}
