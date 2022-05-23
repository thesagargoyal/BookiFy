import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";
import LogIn from "./screens/LogIn.js";
import SignUp from "./screens/SignUp.js";
import Dashboard from "./screens/Dashboard.js";
import AddBook from "./screens/AddBook.js";
import Description from "./screens/Description.js";
import Edit from "./screens/Edit.js";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const firebaseConfig = {
  apiKey: "AIzaSyBLZ5FzXK3d6ez8ehdgCLoBwFmzr7UV-pk",
  authDomain: "bookify-12a44.firebaseapp.com",
  projectId: "bookify-12a44",
  storageBucket: "bookify-12a44.appspot.com",
  messagingSenderId: "210855271009",
  appId: "1:210855271009:web:1b96c7a3f31c80d3f36820",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const AuthStack = createStackNavigator();
  const AuthNavigator = () => {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="login"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  const HomeStack = createStackNavigator();
  const HomeStackScreen = () => (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Description" component={Description} />
      <HomeStack.Screen name="AddBook" component={AddBook} />
      <HomeStack.Screen name="Edit" component={Edit} />
    </HomeStack.Navigator>
  );

  const Navigation = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
      const unsuscribe = firebase.auth().onAuthStateChanged((userExist) => {
        if (userExist) {
          setUser(userExist);
        } else {
          setUser("");
        }
      });
      return unsuscribe;
    }, []);

    return (
      <>
        <NavigationContainer>
          {user ? <HomeStackScreen /> : <AuthNavigator />}
        </NavigationContainer>
      </>
    );
  };

  return (
    <>
      <Navigation />
    </>
  );
}
