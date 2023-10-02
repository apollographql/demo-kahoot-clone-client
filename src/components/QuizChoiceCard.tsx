import { Box, Flex, useRadio, Icon } from "@chakra-ui/react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function QuizChoiceCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();
  const { isCorrectAnswer, showCorrectAnswer, text } = props;

  let icon;
  if (showCorrectAnswer) {
    if (isCorrectAnswer) {
      icon = <Icon as={FiCheckCircle} fontSize="3xl" color="green.400" />;
    } else if (!isCorrectAnswer && input.checked) {
      icon = <Icon as={FiXCircle} fontSize="3xl" color="orange.400" />;
    }
  }

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        bg="white"
        _hover={{
          bg: "purple.500",
          borderColor: "purple.500",
          color: "white",
        }}
        _disabled={{
          bg: "gray.300",
          color: "gray.500",
          borderColor: "gray.300",
          cursor: "unset",
        }}
        _checked={{
          bg: "purple.500",
          borderColor: "purple.500",
          color: "white",
        }}
        px={5}
        py={5}
        fontSize={["lg", "xl"]}
      >
        <Flex alignItems="center" justifyContent="space-between">
          {text} {icon}
        </Flex>
      </Box>
    </Box>
  );
}
