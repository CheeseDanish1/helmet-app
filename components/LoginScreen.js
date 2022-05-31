import { StyleSheet, Dimensions } from "react-native";
import {
  Image,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React from "react";
const ScreenWidth = Dimensions.get("screen").width;

const LoginScreen_style_1 = {
  default: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f7f7f7",
    },
    logoImageStyle: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
    textInputContainer: {
      marginTop: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    passwordTextInputContainer: {
      marginTop: 16,
    },
    loginButtonStyle: {
      height: 40,
      width: ScreenWidth * 0.9,
      backgroundColor: "#25a9e2",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 32,
      elevation: 5,
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: "#166080",
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    loginTextStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    haveAccountButtonStyle: {
      marginTop: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    haveAccountTextStyle: {
      color: "#acabb0",
    },
    dividerStyle: {
      height: 0.5,
      marginTop: 24,
      marginBottom: 12,
      borderRadius: 16,
      width: ScreenWidth * 0.8,
      alignSelf: "center",
      backgroundColor: "#ccc",
    },
    socialLoginContainer: {
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    facebookSocialButtonTextStyle: {
      color: "#4267B2",
    },
    twitterSocialButtonTextStyle: {
      color: "#56bfe8",
    },
    discordSocialButtonTextStyle: {
      color: "#5865F2",
    },
    socialButtonStyle: {
      marginTop: 16,
    },
  }),
};

const tslib_1 = require("tslib");
const react_native_text_input_interactive_1 = (0, tslib_1.__importDefault)(
  require("react-native-text-input-interactive")
);

export default LoginScreen = ({
  style,
  dividerStyle,
  logoImageStyle,
  loginTextStyle,
  loginButtonStyle,
  haveAccountTextStyle,
  haveAccountButtonStyle,
  textInputContainerStyle,
  haveAccountText = "Already have an account?",
  disableDivider,
  logoImageSource,
  onLoginPress,
  onHaveAccountPress,
  onEmailChange,
  onPasswordChange,
}) => {
  const Logo = () => (
    <Image
      resizeMode="contain"
      source={logoImageSource}
      style={[LoginScreen_style_1.default.logoImageStyle, logoImageStyle]}
    />
  );
  const TextInputContainer = () => (
    <View
      style={[
        LoginScreen_style_1.default.textInputContainer,
        textInputContainerStyle,
      ]}
    >
      <react_native_text_input_interactive_1.default
        placeholder="Email"
        onChangeText={onEmailChange}
      />
      <View style={LoginScreen_style_1.default.passwordTextInputContainer}>
        <react_native_text_input_interactive_1.default
          placeholder="Password"
          secureTextEntry
          onChangeText={onPasswordChange}
        />
      </View>
    </View>
  );
  const LoginButton = () => (
    <TouchableOpacity
      style={[LoginScreen_style_1.default.loginButtonStyle, loginButtonStyle]}
      onPress={onLoginPress}
    >
      <Text
        style={[LoginScreen_style_1.default.loginTextStyle, loginTextStyle]}
      >
        Login
      </Text>
    </TouchableOpacity>
  );
  const AlreadyHaveAccount = () => (
    <TouchableOpacity
      style={[
        LoginScreen_style_1.default.haveAccountButtonStyle,
        haveAccountButtonStyle,
      ]}
      onPress={onHaveAccountPress}
    >
      <Text
        style={[
          LoginScreen_style_1.default.haveAccountTextStyle,
          haveAccountTextStyle,
        ]}
      >
        {haveAccountText}
      </Text>
    </TouchableOpacity>
  );
  const Divider = () => (
    <View style={[LoginScreen_style_1.default.dividerStyle, dividerStyle]} />
  );
  return (
    <SafeAreaView style={[LoginScreen_style_1.default.container, style]}>
      <StatusBar barStyle="dark-content" />
      <Logo />
      <TextInputContainer />
      <LoginButton />
      <AlreadyHaveAccount />
      {!disableDivider && <Divider />}
    </SafeAreaView>
  );
};
