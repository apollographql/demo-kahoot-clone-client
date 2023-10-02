import {
  Button,
  Container,
  Link as ChakraLink,
  Text,
  Select,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const ALL_QUIZZES_QUERY = gql`
  query AllQuizzes {
    allQuizzes {
      id
      title
    }
  }
`;

const NEXT_QUESTION_MUTATION = gql`
  mutation NextQuestion($quizId: ID!) {
    nextQuestion(quizId: $quizId) {
      id
      title
      choices {
        id
        text
      }
    }
  }
`;

const PLAYERS_FOR_QUIZ_SUBSCRIPTION = gql`
  subscription PlayersForAQuiz($quizId: ID!) {
    playersForAQuiz(quizId: $quizId) {
      id
      name
      points
    }
  }
`;

const PLAYERS_FOR_QUIZ_QUERY = gql`
  query PlayersForAQuiz($quizId: ID!) {
    playersForAQuiz(quizId: $quizId) {
      id
      name
      points
    }
  }
`;

function NextQuestionButton({ setCurrentQuestion, selectedQuizId }) {
  const [showNextQuestion] = useMutation(NEXT_QUESTION_MUTATION, {
    variables: { quizId: selectedQuizId },
    onCompleted: (data) => {
      if (data.nextQuestion) {
        setCurrentQuestion(data.nextQuestion.title);
      } else {
        setCurrentQuestion("Quiz ended.");
      }
    },
    onError: (e) => {
      setCurrentQuestion(e.message);
    },
  });

  return (
    <Button
      onClick={() => {
        showNextQuestion();
      }}
      colorScheme="orange"
      mb={2}
    >
      Show next question
    </Button>
  );
}

function SelectQuiz({ setSelectedQuizId }) {
  const { loading, data, error } = useQuery(ALL_QUIZZES_QUERY);

  if (loading) return "Loading";
  if (error) return `Error: ${error.message}`;

  const { allQuizzes } = data;

  return (
    <Select
      placeholder="Select a quiz"
      onChange={(e) => setSelectedQuizId(e.target.value)}
    >
      {allQuizzes.map((q) => {
        return (
          <option value={q.id} key={q.id}>
            {q.title}
          </option>
        );
      })}
    </Select>
  );
}

function PlayerList({ players, subscribeToUpdates }) {
  useEffect(() => {
    subscribeToUpdates();
  }, []);

  if (players.length === 0) {
    return "Waiting for players to join...";
  }

  return (
    <Stack spacing={2}>
      {players.map((player, index) => (
        <Text>
          {index + 1}. {player.name}
        </Text>
      ))}
    </Stack>
  );
}

function PlayersForQuiz({ quizId }) {
  const { loading, error, data, subscribeToMore } = useQuery(
    PLAYERS_FOR_QUIZ_QUERY,
    {
      variables: { quizId: quizId },
    },
  );

  if (loading) return "Loading";
  if (error) return `Error: ${error.message}`;

  const players = data.playersForAQuiz;
  const username = localStorage.getItem("playername") || "N/A";

  return (
    <>
      <Text mb={2}>You are signed in as: {username}</Text>
      <Text mb={2}>Players:</Text>
      <PlayerList
        players={players}
        subscribeToUpdates={() => {
          subscribeToMore({
            document: PLAYERS_FOR_QUIZ_SUBSCRIPTION,
            variables: { quizId: quizId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return Object.assign({}, prev, {
                playersForAQuiz: subscriptionData.data.playersForAQuiz,
              });
            },
            onError: (e) => {
              console.log(e);
            },
          });
        }}
      />
    </>
  );
}

export default function SuperSecretAdminPage() {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  return (
    <Container
      maxW="800px"
      minH="500px"
      margin={0}
      padding={0}
      p={16}
      borderRadius="lg"
    >
      <Heading>Super secret admin page</Heading>
      <br />
      <SelectQuiz setSelectedQuizId={setSelectedQuizId} />
      <br />
      {selectedQuizId && (
        <>
          <NextQuestionButton
            setCurrentQuestion={setCurrentQuestion}
            selectedQuizId={selectedQuizId}
          />
          <Text fontSize="lg">Current question: {currentQuestion}</Text>
        </>
      )}
      <br />
      {selectedQuizId && (
        <ChakraLink
          as={Link}
          to={`/leaderboard/${selectedQuizId}`}
          target="_blank"
        >
          <Button variant="outline" colorScheme="orange" mb={2}>
            Go to leaderboard
          </Button>
        </ChakraLink>
      )}
      {selectedQuizId && <PlayersForQuiz quizId={selectedQuizId} />}
    </Container>
  );
}
