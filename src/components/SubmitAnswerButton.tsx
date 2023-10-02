import { Button } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const ANSWER_QUESTION_MUTATION = gql`
  mutation AnswerQuestion($quizId: ID!, $questionId: ID!, $choiceId: ID) {
    answer(quizId: $quizId, questionId: $questionId, choiceId: $choiceId) {
      rightChoice {
        id
        text
      }
    }
  }
`;
export default function SubmitAnswerButton({
  selectedAnswer,
  quizId,
  questionId,
  correctAnswer,
  setIsChoicesDisabled,
  setCorrectAnswer,
}) {
  const [answerQuestionMutation, { loading, error }] = useMutation(
    ANSWER_QUESTION_MUTATION,
  );

  const handleSubmit = () => {
    setIsChoicesDisabled(true);

    answerQuestionMutation({
      variables: {
        quizId: quizId,
        questionId: questionId,
        choiceId: selectedAnswer,
      },
      onCompleted: (mutationData) => {
        setCorrectAnswer(mutationData.answer.rightChoice.id);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Button
      size="lg"
      colorScheme="orange"
      isDisabled={!selectedAnswer || loading || correctAnswer}
      isLoading={loading}
      loadingText={"Submitting"}
      onClick={handleSubmit}
    >
      {correctAnswer
        ? "Waiting for next question..."
        : error
        ? `Error: ${error}`
        : "Submit"}
    </Button>
  );
}
