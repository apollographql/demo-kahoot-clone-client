import { SimpleGrid, SimpleGridProps, useRadioGroup } from "@chakra-ui/react";
import QuizChoiceCard from "./QuizChoiceCard";

type QuizQuestionProps = {
  question: {
    id: string;
    text: string;
    choices: {
      id: string;
      text: string;
    }[];
  };
  correctAnswer: string | null;
  isChoicesDisabled: boolean;
  radioGroupProps: SimpleGridProps;
  getRadioProps: ReturnType<typeof useRadioGroup>["getRadioProps"];
};

export default function QuizQuestion({
  question,
  correctAnswer,
  isChoicesDisabled,
  radioGroupProps,
  getRadioProps,
}: QuizQuestionProps) {
  return (
    <SimpleGrid columns={[1, 2]} spacing={4} mb={8} {...radioGroupProps}>
      {question.choices.map((q) => {
        const radio = getRadioProps({
          value: q.id,
        });
        return (
          <QuizChoiceCard
            key={q.id}
            {...radio}
            isDisabled={isChoicesDisabled}
            isCorrectAnswer={correctAnswer === q.id}
            showCorrectAnswer={correctAnswer !== null}
            text={q.text}
          />
        );
      })}
    </SimpleGrid>
  );
}
