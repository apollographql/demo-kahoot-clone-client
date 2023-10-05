import { Button, Stack, Container } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_ALL_QUIZZES = gql`
  query GetAllQuizzes {
    allQuizzes {
      id
      title
    }
  }
`;

export default function Leaderboard() {
  const { loading, error, data } = useQuery<{
    allQuizzes: Array<{ id: string; title: string }>;
  }>(GET_ALL_QUIZZES);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return error.message;
  }

  return (
    <Container
      maxW="800px"
      minH="500px"
      margin={0}
      padding={0}
      bgColor="brand.regolith"
      p={16}
      borderRadius="lg"
    >
      <Stack>
        {data!.allQuizzes.map((q) => (
          <Link to={q.id}>
            <Button>{q.title}</Button>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
