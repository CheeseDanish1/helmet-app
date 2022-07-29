import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements/dist/icons/Icon";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { getUser } from "../utils/api";
import AddHelmet from "../components/AddHelmetModal";
import BottomSheet from "@gorhom/bottom-sheet";

// curl -X POST -d 'id=abcdefu' -d 'code=password' -d 'lat=40.701290' -d 'lng=-75.322670'  http://shelmet.herokuapp.com/api/helmet/update-location

export default function App({ navigation, userKey, socket }) {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [camera, setCamera] = React.useState(null);

  // Helmets will be in an array
  // This is the position of the helmet being shown
  // By default it shows the first one
  const [helmetPosition, setHelmetPosition] = React.useState(0);
  const [visible, setVisibilty] = React.useState(false);
  const [test, setTest] = React.useState(null);

  React.useEffect(() => {
    // Get user

    if (!userKey) return navigation.goBack();
    getUser(userKey).then((r) => {
      console.log(r, userKey);
      setUser(r.user);
      const helmetInfo = r.user.helmets[0];
      if (helmetInfo)
        setCamera({
          latitude: parseFloat(helmetInfo.lastLocation.lat - 0.0002),
          longitude: parseFloat(helmetInfo.lastLocation.lng),
        });

      setLoading(false);
    });
  }, [userKey]);

  React.useEffect(() => {
    // Update map when location changes

    if (!socket || !user) return;
    socket.on("update-location", (data) => {
      let helmet1 = user?.helmets[helmetPosition];
      if (!helmet1) return;
      if (helmet1.id != data.id) return;
      let helmet2 = helmet1;
      helmet2.lastLocation.lat = data.lat;
      helmet2.lastLocation.lng = data.lng;
      helmet2.lastLocation.location = data.location;

      let user1 = user;
      user1.helmets[helmetPosition] = helmet2;
      setUser(user1);
      setTest((p) => !p);
    });

    return () => socket.off("update-location");
  }, [socket, user, helmetPosition]);

  React.useEffect(() => {
    // Anoying thing to get the header working
    // That I need to do every fucking time
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

  // These are for the map
  const bottomSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%", "100%"], []);

  if (loading || !user) return <Text>Loading...</Text>;

  if (!user?.helmets || user?.helmets?.length <= 0)
    return <Text>No helmets, add functionality later</Text>;

  const helmet = user?.helmets[helmetPosition] || [];
  return (
    <>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: parseFloat(helmet.lastLocation.lat - 0.001),
            longitude: parseFloat(helmet.lastLocation.lng),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsCompass={false}
          camera={{
            center: camera,
            pitch: 0,
            altitude: 10000,
            heading: 0,
            zoom: 0,
          }}
          style={styles.map}
        >
          {user.helmets.map((helmet) => {
            return (
              <Marker
                key={helmet.id}
                coordinate={{
                  latitude: parseFloat(helmet.lastLocation.lat),
                  longitude: parseFloat(helmet.lastLocation.lng),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={(e) => {
                  setCamera({
                    latitude: e.nativeEvent.coordinate.latitude - 0.01,
                    longitude: e.nativeEvent.coordinate.longitude,
                  });
                }}
                title={helmet.name}
                description="This is the last known location of your helmet"
              />
            );
          })}
        </MapView>
      </View>
      <AddHelmet
        helmets={user.helmets}
        visible={visible}
        setVisibilty={setVisibilty}
      />
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          if (user.helmets.length == 1)
            return Alert.alert("You have no other helmets to switch to");

          let options = [
            ...user.helmets.map((r) => r.name).filter((r) => r != helmet.name),
            "Add Helmet",
            "Cancel",
          ];
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex: options.length - 1,
            },
            (buttonIndex) => {
              // Cancel Button
              if (buttonIndex == options.length - 1) return;

              // Add Helmet button
              if (buttonIndex == options.length - 2) return setVisibilty(true);

              // Chose a helmet
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
              <Text>{JSON.stringify(helmet)}</Text>
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
