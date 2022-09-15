import React, { useContext } from "react";
import { Box, Button, Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import { StateContext } from "../../contexts";
import translate from "../../translate";

const Test = () => {
  const route = useRoute();
  const state = useContext(StateContext);

  return (
    <Box flex={1} px={5}>
      <Text>{JSON.stringify(state)}</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Box h={5} />
      <Button
        onPress={() =>
          state.updateSessionToken(Math.random().toString(36).slice(2))
        }>
        Update session token
      </Button>
      <Box h={5} />
      <Button onPress={state.updateTrips}>Update trips</Button>
      <Box h={5} />
      <Button onPress={state.updateBookings}>Update bookings</Button>
      <Box h={5} />
      <Text>{translate.t("test")}</Text>
    </Box>
  );
};

export default Test;
