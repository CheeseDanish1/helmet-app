import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

const pages = [
  {
    name: "Home",
  },
  {
    name: "About",
  },
  {
    name: "Manage",
  },
];

export default function Menu({ navigation }) {
  return (
    <View style={styles.menu}>
      <FlatList
        data={pages}
        renderItem={({ item }) => {
          return (
            <MenuComponent
              text={item.name}
              navigation={navigation}
              key={item.index}
            />
          );
        }}
      />
    </View>
  );
}

function MenuComponent({ text, navigation }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(text)}
    >
      <Text style={{ fontSize: 42, color: "#5d5d5d" }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menu: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 25,
  },
  menuItem: {
    height: 80,
    width: 350,
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    // borderBottomColor: "black",
  },
});
