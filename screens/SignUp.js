import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import RadioForm from "react-native-simple-radio-button";
import firebase from "firebase";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(true);

  const radioProps = [
    { label: "Admin", value: true },
    { label: "Guest", value: false },
  ];

  const userSignup = async () => {
    if (!email || !password || !name)
      Alert.alert("Please enter required fields!");
    else {
      if (password.length < 8) {
        Alert.alert("Please enter password of minimum 8 characters!");
      } else {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (result) => {
            var userNow = firebase.auth().currentUser;
            userNow
              .updateProfile({
                displayName: name,
              })
              .then(async () => {
                await firebase.database().ref("userData").push({
                  isAdmin: admin,
                  uid: firebase.auth().currentUser.uid,
                });
              });
          })
          .catch((error) => {
            Alert.alert("Something went wrong!");
          });
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <View>
        <Text style={styles.headerStyle}> SignUp to continue</Text>
      </View>
      <View style={styles.fieldsContainer}>
        <TextInput
          mode="outlined"
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          maxLength={20}
        />
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
      <View style={styles.buttonsContainer}>
        <View style={styles.roleContainer}>
          <Text style={styles.roleStyle}>Role</Text>
        </View>
        <RadioForm
          buttonColor="gray"
          buttonSize={12}
          radioStyle={{ paddingTop: 5, paddingBottom: 10 }}
          selectedButtonColor="#000000"
          radio_props={radioProps}
          initial={0}
          animation={false}
          onPress={(value) => setAdmin(value)}
        />
        <Button
          mode="contained"
          onPress={userSignup}
          theme={{ colors: { primary: "#2150f5" } }}
        >
          Sign Up
        </Button>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 20 }}
          >
            Already have an account ? Log In !
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
  roleContainer: {
    marginBottom: 5,
  },
  roleStyle: {
    fontSize: 20,
  },
  fieldsContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  headerStyle: {
    fontSize: 22,
    textAlign: "center",
  },
  buttonsContainer: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});
