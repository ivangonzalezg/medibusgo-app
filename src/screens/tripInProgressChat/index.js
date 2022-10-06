import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, FlatList, HStack, Input, Text, VStack } from "native-base";
import moment from "moment";
import database from "@react-native-firebase/database";
import Container from "../../components/container";
import { StateContext } from "../../contexts";

const TripInProgressChat = () => {
  const state = useContext(StateContext);
  const flatList = useRef();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const reference = database()
    .ref()
    .child("airlinku")
    .child("servicio")
    .child(String(state.tripInProgress.servicio.id))
    .child("chat")
    .child("publico");

  useEffect(() => {
    reference.orderByChild("date").on("value", snap => {
      let _messages = snap.val();
      if (_messages) {
        _messages = Object.keys(_messages).map(key => ({
          id: key,
          incoming: _messages[key].userId !== state.user.user_id,
          message: _messages[key].message,
          name: _messages[key].name,
          date: _messages[key].date,
        }));
        setMessages(_messages.sort((a, b) => a.date.localeCompare(b.date)));
      }
      setIsLoading(false);
    });
    return () => {
      reference.off();
    };
  }, []);

  const onSendMessage = () => {
    reference.push({
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      media_type: 0,
      message,
      name: state.user.nombre_usuario,
      read: false,
      userId: state.user.user_id,
    });
    setMessage("");
  };

  return (
    <Container>
      <VStack px={5} flex={1}>
        <Text fontSize="xl" textAlign="center" mb={3}>
          Chat público
        </Text>
        <FlatList
          ref={flatList}
          onLayout={() => flatList?.current?.scrollToEnd()}
          onContentSizeChange={() => flatList?.current?.scrollToEnd()}
          data={messages}
          renderItem={({ item }) => (
            <VStack
              w="70%"
              px={3}
              py={2}
              mb={2}
              alignSelf={item.incoming ? "flex-start" : "flex-end"}
              borderTopRadius="lg"
              borderBottomRightRadius={item.incoming ? "xl" : "none"}
              borderBottomLeftRadius={item.incoming ? "none" : "xl"}
              bg={item.incoming ? "#4F95FF" : "#E7E7E7"}
              space={1}>
              <Text color={item.incoming ? "white" : "black"}>
                {item.message}
              </Text>
              <Text
                color={item.incoming ? "white" : "black"}
                fontSize="xs"
                textAlign="right">
                {item.date}
              </Text>
            </VStack>
          )}
          keyExtractor={item => item.id}
          refreshing={isLoading}
          onRefresh={() => {}}
        />
        <HStack space={3} my={3}>
          <Input
            flex={1}
            h="100%"
            placeholder="Escribe un mensaje"
            value={message}
            onChangeText={setMessage}
          />
          <Button onPress={onSendMessage}>Enviar</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default TripInProgressChat;
