import { gql, useQuery } from "@apollo/client";
import { Container, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import LeaderboardPlayerList from "../components/LeaderboardPlayerList";

const GET_LEADERBOARD_QUERY = gql`
  query GetLeaderboardForQuiz($quizIdVariable: ID!) {
    leaderboardForQuiz(id: $quizIdVariable) {
      quiz {
        id
        title
      }
      list {
        id
        points
        name
      }
    }
  }
`;

// WORKSHOP - FILL IN?
const LEADERBOARD_SUBSCRIPTION = gql`
  subscription LeaderboardSubscription($quizIdVariable: ID!) {
    leaderboardForQuiz(id: $quizIdVariable) {
      quiz {
        id
        title
      }
      list {
        id
        points
      }
    }
  }
`;

export default function LeaderboardForQuiz() {
  const { quizId } = useParams();

  // WORKSHOP - FILL IN?
  const { loading, error, data, subscribeToMore } = useQuery(
    GET_LEADERBOARD_QUERY,
    {
      variables: { quizIdVariable: quizId },
    },
  );

  if (loading) {
    return "Loading";
  }
  if (error) {
    return error.message;
  }

  let players;
  let quiz;

  if (!data.leaderboardForQuiz) {
    players = [];
    quiz = {
      id: quizId,
    };
  } else {
    players = data.leaderboardForQuiz.list;
    quiz = data.leaderboardForQuiz.quiz;
  }

  return (
    <Container
      maxW="800px"
      minH="500px"
      margin={0}
      bgColor="brand.regolith"
      p={[4, 8, 16]}
      borderRadius="lg"
    >
      <Stack>
        <Text fontSize="2xl" mb={8} textAlign="center" fontWeight={600}>
          Leaderboard {quiz.title ? `for ${quiz.title}` : ""}
        </Text>
        <LeaderboardPlayerList
          players={players}
          subscribeToUpdates={() => {
            // WORKSHOP - FILL IN?
            subscribeToMore({
              document: LEADERBOARD_SUBSCRIPTION,
              variables: { quizIdVariable: quizId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                return {
                  ...prev,
                  leaderboardForQuiz: {
                    list: subscriptionData.data.leaderboardForQuiz.list,
                  },
                };
              },
              onError: (e) => {
                console.log(e);
              },
            });
          }}
        />
      </Stack>
    </Container>
  );
}
