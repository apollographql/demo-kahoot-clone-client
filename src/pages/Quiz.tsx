import { Container, Stack, Text, useRadioGroup } from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { gql, useSubscription } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import SubmitAnswerButton from "../components/SubmitAnswerButton";
import QuizQuestion from "../components/QuizQuestion";
import QuizHeader from "../components/QuizHeader";

// WORKSHOP - FILL IN?
const QUESTION_SUBSCRIPTION = gql`
  subscription QuestionSubscription($quizId: ID!) {
    newQuestion(quizId: $quizId) {
      id
      title
      choices {
        text
        id
      }
    }
  }
`;

export default function Quiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [isChoicesDisabled, setIsChoicesDisabled] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // WORKSHOP - FILL IN?
  const { data, loading, error } = useSubscription(QUESTION_SUBSCRIPTION, {
    variables: { quizId },
    onComplete: () => {
      return navigate(`/leaderboard/${quizId}`);
    },
  });

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    onChange: (a) => {
      setSelectedAnswer(a);
    },
    defaultValue: selectedAnswer,
  });
  const radioGroupProps = getRootProps();

  // next question coming up, reset chosen answers and previous correct answer
  useEffect(() => {
    setSelectedAnswer("");
    setValue("");
    setIsChoicesDisabled(false);
    setCorrectAnswer(null);
  }, [data, setValue]);

  if (loading) return <Text fontSize="2xl">Waiting....</Text>;
  if (error) return <Text fontSize="2xl">{error.message}</Text>;

  const question = data.newQuestion;

  return (
    <Container
      maxW="800px"
      minH="500px"
      margin={0}
      pt={0}
      pb={10}
      px={0}
      bgColor="brand.ocean"
      borderRadius="lg"
    >
      <QuizHeader quizId={quizId} />
      <Stack px={[4, 8, 16]}>
        <Text
          fontSize={["xl", "3xl"]}
          mb={8}
          textAlign="center"
          lineHeight="1.1em"
        >
          {question.title}
        </Text>
        <QuizQuestion
          question={question}
          correctAnswer={correctAnswer}
          isChoicesDisabled={isChoicesDisabled}
          radioGroupProps={radioGroupProps}
          getRadioProps={getRadioProps}
        />
        <SubmitAnswerButton
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          quizId={quizId}
          questionId={question.id}
          setIsChoicesDisabled={setIsChoicesDisabled}
          setCorrectAnswer={setCorrectAnswer}
        />
      </Stack>
    </Container>
  );
}
