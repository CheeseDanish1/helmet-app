import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import React from "react";
// https://dribbble.com/shots/10991972-Covid-19#
export default function App({ navigation }) {
  function changePage(location) {
    navigation.navigate(location);
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
      <Text style={styles.titleText}>Hello!</Text>
      <Text style={styles.subText}>
        Are you ready to start using your first Smart Helmet!
      </Text>
      <Text>Continue this later</Text>
      <TextInput />
      <Button onPress={() => changePage("Login")} title="Go to next page" />
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
