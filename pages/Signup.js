import React from "react";
import { Alert, Text } from "react-native";
import SignupScreen from "../components/SignupScreen";
import { signup } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation, setUserKey }) {
  let email = "";
  let password = "";
  let password2 = "";
  let username = "";

  async function onSubmit() {
    console.log(email, password, password2, username);

    if (!email || !password || !password2 || !username)
      return signupAlert("You must fill out all fields");
    if (password != password2) return signupAlert("Your passwords must match");
    const data = await signup(username, email, password);
    const res = await data.json();

    if (res.error) return signupAlert(res.message);

    const encryptedData = data?.headers
      ?.get("set-cookie")
      ?.split(";")[0]
      .split("=")[1];

    console.log(encryptedData);

    if (!encryptedData)
      return signupAlert("Yell at sam because he messed something up");

    navigation.navigate("Home");
    await AsyncStorage.setItem("authorization", encryptedData);
    setUserKey(encryptedData);
  }

  function signupAlert(message) {
    Alert.alert(message);
  }

  return (
    <SignupScreen
      logoImageSource={require("../assets/adaptive-icon.png")}
      onLoginPress={onSubmit}
      onHaveAccountPress={() => {
        navigation.navigate("Login");
      }}
      onUsernameChange={(newUsername) => (username = newUsername)}
      onEmailChange={(newEmail) => (email = newEmail)}
      onPasswordChange={(newPassword) => (password = newPassword)}
      onConfirmPasswordChange={(newPassword2) => (password2 = newPassword2)}
      disableSocialButtons={true}
      haveAccountText="Have an account?"
    />
  );
}
