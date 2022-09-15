import React from "react";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import routes from "../../routes";
import ambulance from "../../assets/images/ambulance.png";
import apple from "../../assets/icons/apple.png";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import colors from "../../constants/colors";
import styles from "./styles";

const SocialButton = props => {
  const { children, ...rest } = props;

  return (
    <Pressable
      w={60}
      h={60}
      justifyContent="center"
      alignItems="center"
      bg={colors.socialButton}
      borderColor={colors.socialButtonBorder}
      borderWidth={1}
      borderRadius={10}
      {...rest}>
      {children}
    </Pressable>
  );
};

const Initial = () => {
  const navigation = useNavigation();

  return (
    <VStack flex={1} backgroundColor={colors.endGradient}>
      <LinearGradient
        colors={[colors.startGradient, colors.endGradient]}
        style={styles.linearGradient}>
        <VStack flex={1} justifyContent="center" alignItems="center" space={5}>
          <VStack>
            <Heading color={colors.titleText} fontSize="3xl">
              Bienvenido a {"\r\n"} Medibus GO
            </Heading>
          </VStack>
          <Image
            w={200}
            h={200}
            resizeMode="contain"
            source={ambulance}
            alt="ambulance"
          />
        </VStack>
      </LinearGradient>
      <VStack
        bg="white"
        shadow={2}
        safeAreaBottom
        px={10}
        pt={50}
        borderTopRadius={20}>
        <Button>Ingresar</Button>
        <HStack alignItems="center" my={30}>
          <Divider flex={1} bg={colors.divider} />
          <Text fontSize="sm" color={colors.lightText} mx={6}>
            Continuar con
          </Text>
          <Divider flex={1} bg={colors.divider} />
        </HStack>
        <HStack justifyContent="space-between" mb={30}>
          <SocialButton>
            <Image
              w={30}
              h={30}
              resizeMode="contain"
              source={google}
              alt="google"
            />
          </SocialButton>
          <SocialButton>
            <Image
              w={30}
              h={30}
              resizeMode="contain"
              source={apple}
              alt="apple"
            />
          </SocialButton>
          <SocialButton>
            <Image
              w={30}
              h={30}
              resizeMode="contain"
              source={facebook}
              alt="facebook"
            />
          </SocialButton>
        </HStack>
        <Pressable
          alignItems="center"
          py={2}
          onPress={() => navigation.navigate(routes.test)}>
          <Text>
            ¿No eres un miembro?{" "}
            <Text bold color={colors.primary}>
              Registrate
            </Text>
          </Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default Initial;
