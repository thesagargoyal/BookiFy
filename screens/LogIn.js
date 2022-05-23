import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "firebase";

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    if (!email || !password) Alert.alert("Please enter required fields!");
    else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log("signin");
        })
        .catch((error) => {
          Alert.alert(
            "The password is invalid or the user does not have a password."
          );
        });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View>
        <Text style={styles.headerStyle}>Please Log In to continue</Text>
      </View>
      <View style={styles.fieldsContainer}>
        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={{ colors: { primary: "#2150f5" } }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          theme={{ colors: { primary: "#2150f5" } }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={userLogin}
          theme={{ colors: { primary: "#2150f5" } }}
        >
          Log In
        </Button>
        <TouchableOpacity onPress={() => navigation.push("signup")}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 20 }}
          >
            Don't have an account ? SignUp !
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  fieldsContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  headerStyle: {
    fontSize: 22,
    textAlign: "center",
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});
