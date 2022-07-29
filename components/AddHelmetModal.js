import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { addHelmet, getHelmet } from "../utils/api";

export default function AddHelmet({ visible, setVisibilty, helmets }) {
  if (!visible) return <></>;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisibilty(!visible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            setVisibilty(false);
          }}
        >
          <View style={styles.modalView}>
            <InsideModal helmets={helmets} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function InsideModal({ helmets }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);
  const [idError, setIdError] = useState("");

  const ScreenWidth = Dimensions.get("screen").width;
  console.log(step);
  if (step == 0) {
    return (
      <View>
        <Text>Helmet Id</Text>
        <Text
          style={{
            fontSize: 12,
            color: "#565656",
            marginBottom: 10,
            marginTop: 2,
          }}
        >
          This can be found inside your helmet
        </Text>

        <TextInput
          value={id}
          onChangeText={(e) => {
            if (!e) setId((p) => p.slice(0, -1));
            else setId((p) => e);
          }}
          style={styles.input}
        />
        <TouchableOpacity
          style={{
            height: 40,
            width: ScreenWidth / 2,
            backgroundColor: "#25a9e2",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 10,
            elevation: 5,
            shadowRadius: 8,
            shadowOpacity: 0.3,
            shadowColor: "#166080",
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
          onPress={() => {
            if (!id) return;
            getHelmet(id).then(({ helmet }) => {
              if (!helmet) return setIdError("There is no helmet with this id");
              // if (helmets.find((u) => u.id == id)) {
              //   console.log("You already have that helmet");
              //   return setIdError(
              //     "You already have this helmet added to your account"
              //   );
              // }
              // TODO: Error message when helmet is not found
              console.log("NZXT");
              setName(helmet.name || "");
              setStep(1);
            });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (step == 1) {
    return (
      <View>
        <Text>Helmet Name</Text>
        <Text
          style={{
            fontSize: 12,
            color: "#565656",
            marginBottom: 10,
            marginTop: 2,
          }}
        >
          You get to choose this :)
        </Text>

        <TextInput
          value={name}
          onChangeText={(e) => {
            if (!e) setName((p) => p.slice(0, -1));
            else setName((p) => e);
          }}
          style={styles.input}
        />
        <TouchableOpacity
          style={{
            height: 40,
            width: ScreenWidth / 2,
            backgroundColor: "#25a9e2",
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 10,
            elevation: 5,
            shadowRadius: 8,
            shadowOpacity: 0.3,
            shadowColor: "#166080",
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
          onPress={() => {
            if (!name) return;
            addHelmet(id, name).then((data) => {
              console.log(data);
            });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (step == 2) {
    return <Text>Step 2</Text>;
  }

  return <Text>Step Else</Text>;
}

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get("window").width / 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(200, 200, 200, .5)",
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
