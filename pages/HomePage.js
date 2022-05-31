import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ navigation, setUserKey, userKey }) {
  function changePage(location) {
    navigation.navigate(location);
  }
  function logout() {
    AsyncStorage.removeItem("authorization");
    setUserKey(null);
  }
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: (p) => (
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
  return (
    <View style={styles.container}>
      <Text>Loged {!!userKey ? "In" : "Out"}</Text>
      {userKey ? (
        <Button onPress={() => logout()} title="Log out" />
      ) : (
        <View>
          <Button onPress={() => changePage("Login")} title="Log in" />
          <Button onPress={() => changePage("Signup")} title="Sign up" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  subText: {
    color: "#111",
    marginTop: 10,
    textAlign: "center",
    width: 250,
    fontSize: 20,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
});
