import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, About, Manage } from "./pages/";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Menu from "./components/Menu";
import LoginScreen from "react-native-login-screen";

const Stack = createNativeStackNavigator();
// Add cookies https://github.com/react-native-cookies/cookies
// Make login and signup request to server and have it return a cookie value which is then set manually
function App() {
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

  function Login() {
    return (
      <LoginScreen
        logoImageSource={require("./assets/adaptive-icon.png")}
        onLoginPress={() => {}}
        onHaveAccountPress={() => {}}
        onEmailChange={(email) => {}}
        onPasswordChange={(password) => {}}
        disableSocialButtons={true}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={header} />
        <Stack.Screen name="Menu" component={Menu} options={header} />
        <Stack.Screen name="About" component={About} options={header} />
        <Stack.Screen name="Manage" component={Manage} options={header} />
        <Stack.Screen name="Login" component={Login} options={header} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
