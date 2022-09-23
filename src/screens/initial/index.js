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
import styles from "./styles";
import routes from "../../routes";
import ambulance from "../../assets/images/ambulance.png";
import apple from "../../assets/icons/apple.png";
import facebook from "../../assets/icons/facebook.png";
import google from "../../assets/icons/google.png";
import colors from "../../constants/colors";
import translate from "../../translate";

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
      borderRadius="lg"
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
          <Heading fontSize="3xl">{translate.t("initial.title")}</Heading>
          <Image w={200} h={200} source={ambulance} alt="ambulance" />
        </VStack>
      </LinearGradient>
      <VStack
        bg="white"
        shadow={2}
        safeAreaBottom
        px={10}
        pt={50}
        borderTopRadius={20}>
        <Button onPress={() => navigation.navigate(routes.signIn)}>
          {translate.t("initial.enter")}
        </Button>
        <HStack my={30}>
          <Divider flex={1} bg={colors.divider} />
          <Text fontSize="sm" color={colors.lightText} mx={6}>
            {translate.t("initial.continueWith")}
          </Text>
          <Divider flex={1} bg={colors.divider} />
        </HStack>
        <HStack justifyContent="space-between" mb={30}>
          <SocialButton onPress={() => navigation.navigate(routes.signIn)}>
            <Image w={30} h={30} source={google} alt="google" />
          </SocialButton>
          <SocialButton onPress={() => navigation.navigate(routes.signIn)}>
            <Image w={30} h={30} source={apple} alt="apple" />
          </SocialButton>
          <SocialButton onPress={() => navigation.navigate(routes.signIn)}>
            <Image w={30} h={30} source={facebook} alt="facebook" />
          </SocialButton>
        </HStack>
        <Pressable
          alignItems="center"
          py={2}
          onPress={() => navigation.navigate(routes.signUp)}>
          <Text>
            {translate.t("initial.notAMember")}{" "}
            <Text bold color={colors.primary}>
              {translate.t("initial.signUp")}
            </Text>
          </Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default Initial;
