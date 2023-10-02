import { Button } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const JOIN_QUIZ_MUTATION = gql`
  mutation JoinQuizMutation($quizId: ID!, $userName: String!) {
    createPlayer(quizId: $quizId, userName: $userName) {
      id
      name
      quizId
    }
  }
`;

export default function JoinQuizButton({ selectedQuiz, username }) {
  const navigate = useNavigate();

  const [joinQuizMutation, { loading: mutationLoading }] =
    useMutation(JOIN_QUIZ_MUTATION);

  return (
    <Button
      colorScheme="orange"
      size="lg"
      isDisabled={!selectedQuiz}
      isLoading={mutationLoading}
      onClick={async () => {
        await joinQuizMutation({
          variables: {
            quizId: selectedQuiz,
            userName: username,
          },
          onCompleted: (mutationData) => {
            localStorage.setItem("playertoken", mutationData.createPlayer.id);
            localStorage.setItem("playername", mutationData.createPlayer.name);
            return navigate(`/quiz/${mutationData.createPlayer.quizId}`);
          },
          onError: (mutationError) => {
            console.log(mutationError);
          },
        });
      }}
      mt={4}
    >
      Join
    </Button>
  );
}
