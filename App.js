import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// import the screens
import ShoppingLists from "./components/ShoppingLists";
import Welcome from "./components/Welcome";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();
  // Web app's Firebase configuration

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  const firebaseConfig = {
    apiKey: "AIzaSyDXtWeCh4S4snm3PEn-M4iSnexDEGHCn48",
    authDomain: "shopping-list-app-3e1a0.firebaseapp.com",
    projectId: "shopping-list-app-3e1a0",
    storageBucket: "shopping-list-app-3e1a0.firebasestorage.app",
    messagingSenderId: "1092278818037",
    appId: "1:1092278818037:web:3fc05df33b8538b6e961bc",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="ShoppingLists">
          {(props) => (
            <ShoppingLists
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
