import { Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";

function PlayerItem(props) {
  const { rank, name, points } = props;

  const loggedInUser = localStorage.getItem("playername");
  const bgColor = loggedInUser === name ? "brand.sun" : "white";
  const fontWeight = loggedInUser === name ? "600" : "400";

  return (
    <Card>
      <CardBody p={4} bgColor={bgColor} fontWeight={fontWeight}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex alignItems={"center"} flex={1} minWidth={0}>
            <Text mr={4} fontSize={"lg"}>
              #{rank}
            </Text>
            <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              {name}
            </Text>
          </Flex>
          <Text>{points} pts</Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default function LeaderboardPlayerList({ players, subscribeToUpdates }) {
  useEffect(() => {
    subscribeToUpdates();
  }, []);

  if (players.length == 0) {
    return "Nothing to show yet";
  }

  return (
    <Stack spacing={2}>
      {players.map((player, index) => (
        <PlayerItem {...player} rank={index + 1} key={player.id} />
      ))}
    </Stack>
  );
}
