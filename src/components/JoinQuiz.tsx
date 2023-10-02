import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { generateUsername } from "../utils/UsernameGenerator";
import { FiRefreshCw } from "react-icons/fi";
import {
  Button,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import JoinQuizButton from "./JoinQuizButton";

const GET_ALL_QUIZZES = gql`
  query GetAllQuizzes {
    allQuizzes {
      id
      title
    }
  }
`;

function QuizCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        bg="white"
        _checked={{
          bg: "orange.100",
          borderColor: "orange.100",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function JoinQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);
  const [username, setUsername] = useState(generateUsername());

  const { loading, error, data } = useQuery(GET_ALL_QUIZZES);

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: (q) => setSelectedQuiz(q),
    defaultValue: selectedQuiz,
  });
  const group = getRootProps();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { allQuizzes } = data;

  return (
    <Container
      maxW="800px"
      minW="250px"
      borderWidth={4}
      borderStyle="solid"
      borderColor="brand.horizon"
      borderRadius="lg"
      px={[4, 8, 16]}
      py={12}
    >
      <Heading mb={8}>🚀Join quiz</Heading>
      <Stack spacing={4}>
        <Box>
          <Text fontWeight={300} textTransform="uppercase" mb={2}>
            Select a quiz
          </Text>
          <Stack direction={["column", "row"]} wrap="wrap" {...group}>
            {allQuizzes.map((q) => {
              const radio = getRadioProps({ value: q.id });
              return (
                <QuizCard key={q.id} {...radio}>
                  {q.title}
                </QuizCard>
              );
            })}
          </Stack>
        </Box>
        <Box>
          <Flex gap={4} alignItems="center">
            <Stack spacing={0}>
              <Flex alignItems="center">
                <Text fontWeight="light" textTransform="uppercase" mr={2}>
                  Username
                </Text>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  border={0}
                  padding={0}
                  size="sm"
                  onClick={() => setUsername(generateUsername())}
                >
                  <Icon as={FiRefreshCw} />
                </Button>
              </Flex>
              <Text> {username}</Text>
            </Stack>
          </Flex>
        </Box>
        <JoinQuizButton selectedQuiz={selectedQuiz} username={username} />
      </Stack>
    </Container>
  );
}
