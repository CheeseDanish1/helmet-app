import * as React from "react";
import MapView from "react-native-maps";
import { Icon } from "react-native-elements/dist/icons/Icon";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { getHelmet } from "../utils/api";

const helmetId = "9hjk";

// Get Helmet info from Id

export default function App({ navigation }) {
  // const [location, setLocation] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [settings, showSettings] = React.useState(false);
  const [helmet, setHelmet] = React.useState(null);

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

  React.useEffect(() => {
    getHelmet(helmetId)
      .then(({ helmet }) => {
        helmet.lastLocation.lat = parseFloat(helmet.lastLocation.lat);
        helmet.lastLocation.lng = parseFloat(helmet.lastLocation.lng);
        setHelmet(helmet);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  if (loading) return <Text>Loading</Text>;

  // Add animations

  return (
    <View>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: helmet.lastLocation.lat,
            longitude: helmet.lastLocation.lng,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: helmet.lastLocation.lat,
              longitude: helmet.lastLocation.lng,
            }}
            title="Helmet"
            description="This is the current location of your helmet"
          />
        </MapView>
      </View>
      <View style={styles.settingsIcon}>
        <TouchableOpacity
          onPress={() => {
            showSettings((p) => !p);
          }}
        >
          <Icon size={32} name="settings" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={settings}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          showSettings(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Helmet Name</Text>
            <TextInput value={helmet.name} style={styles.input} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => showSettings(!settings)}
            >
              <Text style={styles.textStyle}>Finished</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width / 2,
  },
  text: {
    fontSize: 20,
  },
  settingsIcon: {
    position: "absolute",
    top: 20,
    right: 25,
    borderRadius: 999,
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
