import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomePage,
  About,
  Manage,
  Login,
  Loading,
  Signup,
  Menu,
} from "./pages/";
import { Icon } from "react-native-elements/dist/icons/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

// Add cookies https://github.com/react-native-cookies/cookies
// Make login and signup request to server and have it return a cookie value which is then set manually

function App() {
  const [userKey, setUserKey] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  AsyncStorage.getItem("authorization").then((r) => {
    setUserKey(r || null);
    setLoading(false);
  });

  const header = {
    title: "Smart Helmet",
    headerStyle: {
      backgroundColor: "#3a48ec",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 24,
    },
    headerRight: (p) => (
      <Icon
        name="menu"
        style={{ marginRight: 10 }}
        size={36}
        color="white"
        onPress={() => {}}
      />
    ),
  };

  if (loading) return <Loading />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={header}>
          {(props) => (
            <HomePage
              {...props}
              text="Home Page"
              setUserKey={setUserKey}
              userKey={userKey}
            />
          )}
        </Stack.Screen>
        {/* <Stack.Screen name="Home" component={HomePage} options={header} /> */}
        <Stack.Screen name="Menu" component={Menu} options={header} />
        <Stack.Screen name="About" component={About} options={header} />
        <Stack.Screen name="Manage" options={header}>
          {(props) => <Manage {...props} text="Manage" userKey={userKey} />}
        </Stack.Screen>
        <Stack.Screen name="Login" options={header}>
          {(props) => <Login {...props} text="Login" setUserKey={setUserKey} />}
        </Stack.Screen>
        <Stack.Screen name="Signup" options={header}>
          {(props) => (
            <Signup
              {...props}
              text="Signup"
              setUserKey={setUserKey}
              userKey={userKey}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
