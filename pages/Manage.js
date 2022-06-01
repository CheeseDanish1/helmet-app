import * as React from "react";
import MapView, { Marker } from "react-native-maps";
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
  ActionSheetIOS,
  Alert,
} from "react-native";
import { getUser } from "../utils/api";
import BottomSheet from "@gorhom/bottom-sheet";

export default function App({ navigation, userKey }) {
  const [loading, setLoading] = React.useState(true);
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

  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%", "100%"], []);

  if (loading || !user) return <Text>Loading or error</Text>;

  if (!user?.helmets || user?.helmets?.length <= 0)
    return <Text>No helmets, add functionality later</Text>;

  const helmet = user?.helmets[helmetPosition] || [];

  // Add animations
  return (
    <>
      <View style={styles.container}>
        <MapView
          // initialRegion={{
          //   latitude: parseFloat(helmet.lastLocation.lat),
          //   longitude: parseFloat(helmet.lastLocation.lng),
          //   latitudeDelta: 0.001,
          //   longitudeDelta: 0.001,
          // }}
          region={{
            latitude: parseFloat(helmet.lastLocation.lat),
            longitude: parseFloat(helmet.lastLocation.lng),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(helmet.lastLocation.lat + 1),
              longitude: parseFloat(helmet.lastLocation.lng + 1),
            }}
            title="Helmet"
            description="This is the current location of your helmet"
          />
        </MapView>
      </View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          if (user.helmets.length == 1)
            return Alert.alert("You have no other helmets to switch to");

          let options = [
            ...user.helmets.map((r) => r.name).filter((r) => r != helmet.name),
            "Cancel",
          ];
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex: options.length - 1,
            },
            (buttonIndex) => {
              if (buttonIndex == options.length - 1) return;

              const thisHelmet = user.helmets.find(
                (h) => h.name == options[buttonIndex]
              );
              const index = user.helmets.indexOf(thisHelmet);
              setHelmetPosition(index);
            }
          );
        }}
      >
        <Icon size={32} name="settings" />
      </TouchableOpacity>
      <View style={styles.container2}>
        <BottomSheet
          ref={bottomSheetRef}
          index={2}
          snapPoints={snapPoints}
          enableOverDrag={false}
        >
          <View style={styles.contentContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
                margin: 10,
                alignItems: "center",
              }}
            >
              <Text>Helmet Name</Text>
              <TextInput style={styles.input} value={helmet.name} />
            </View>
          </View>
        </BottomSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
    marginLeft: 30,
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
  container2: {
    flex: 1,
    padding: 24,
    maxHeight: 300,
  },
  contentContainer: {
    flex: 1,
    // alignItems: "center",
  },
});
