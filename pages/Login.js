import React from "react";
import { View, Alert } from "react-native";
import { login } from "../utils/api";
import LoginScreen from "../components/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";

export default function Login({ navigation, setUserKey }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="menu"
          style={{ marginRight: 10 }}
          size={36}
          color="white"
          onPress={() => {
            navigation.navigate("Menu");
          }}
        />
      ),
    });
  }, []);
  // Use state doesn't work don't know why
  let email = "";
  let password = "";

  async function onSubmit() {
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const validEmail = emailRegex.test(email);

    if (!validEmail) return loginError("Must provide a valid email");
    if (!email || !password) return loginError("Must provide a password");

    const data = await login(email, password);
    const res = await data.json();

    if (res.error) return loginError(res.message);

    const encryptedData = data?.headers
      ?.get("set-cookie")
      ?.split(";")[0]
      .split("=")[1];

    if (!encryptedData) loginError("No authorization cookie go yell at sam");

    navigation.navigate("Home");
    await AsyncStorage.setItem("authorization", encryptedData);
    setUserKey(encryptedData);
  }

  function loginError(error) {
    Alert.alert(error);
  }

  return (
    <View style={{ flex: 1 }}>
      <LoginScreen
        logoImageSource={require("../assets/adaptive-icon.png")}
        onLoginPress={onSubmit}
        onHaveAccountPress={() => navigation.navigate("Signup")}
        onEmailChange={(newEmail) => (email = newEmail)}
        onPasswordChange={(newPassword) => (password = newPassword)}
        disableSocialButtons={true}
        haveAccountText="Need an account?"
      />
    </View>
  );
}
