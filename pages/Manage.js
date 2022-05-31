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
import { getUser } from "../utils/api";
import BottomSheet from "@gorhom/bottom-sheet";

export default function App({ navigation, userKey }) {
  // const [location, setLocation] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [settings, showSettings] = React.useState(false);
  const [user, setUser] = React.useState(null);

  // Helmets will be in an array
  // This is the position of the helmet being shown
  // By default it shows the first one
  const [helmetPosition, setHelmetPosition] = React.useState(0);

  React.useEffect(() => {
    if (!userKey) return navigation.goBack();
    getUser(userKey).then((r) => {
      setUser(r.user);
      setLoading(false);
    });
  }, [userKey]);

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

  const bottomSheetRef = React.useRef < BottomSheet > null;

  // variables
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (loading || !user) return <Text>Loading or error</Text>;

  if (!user?.helmets || user?.helmets?.length <= 0)
    return <Text>No helmets, add functionality later</Text>;

  const helmet = user?.helmets[helmetPosition] || [];

  // Add animations
  return (
    <View>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: parseFloat(helmet.lastLocation.lat),
            longitude: parseFloat(helmet.lastLocation.lng),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(helmet.lastLocation.lat),
              longitude: parseFloat(helmet.lastLocation.lng),
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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
      {/* <Modal
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
      </Modal> */}
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
