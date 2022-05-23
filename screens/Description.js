import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import firebase from "firebase";

import { Button } from "react-native-paper";

export default function Dashboard({ route, navigation }) {
  const [bookData, setBookData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(async () => {
    await firebase
      .database()
      .ref("userData")
      .orderByChild("uid")
      .equalTo(firebase.auth().currentUser.uid)
      .on("child_added", function (snapshot) {
        setIsAdmin(snapshot.val().isAdmin);
      });
  }, []);

  useEffect(() => {
    const { data } = route.params;
    setBookData(data);
  }, []);

  const deleteBook = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to Removed this Book ?",
      [
        {
          text: "Yes",
          onPress: () => {
            confirmDelete();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const confirmDelete = async () => {
    let id = "";
    var ref = await firebase.database().ref("bookData");
    ref
      .orderByChild("bookId")
      .equalTo(bookData.bookId)
      .on("child_added", function (snapshot) {
        id = snapshot.key;
      });
    await firebase
      .database()
      .ref("bookData/" + id)
      .remove();

    Alert.alert("Success!!", "Book Removes successfully...");
    navigation.pop();
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.bookContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>
            {bookData && bookData.bookName}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionStyle}>
            {bookData && bookData.description}
          </Text>
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.authorStyle}>
            Author: {bookData && bookData.author}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceStyle}>
            Rs. {bookData && bookData.price}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {isAdmin && (
          <>
            <View style={styles.buttonsContainer}>
              <Button
                mode="contained"
                onPress={() => navigation.push("Edit", { data: bookData })}
                theme={{ colors: { primary: "#2150f5" } }}
              >
                Edit
              </Button>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                mode="contained"
                onPress={deleteBook}
                theme={{ colors: { primary: "#2150f5" } }}
              >
                Delete
              </Button>
            </View>
          </>
        )}
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.pop()}
            theme={{ colors: { primary: "#2150f5" } }}
          >
            Go Back
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
  },
  bookContainer: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  headerStyle: {
    fontSize: 25,
    marginBottom: 6,
    fontWeight: "bold",
  },
  descriptionStyle: {
    fontSize: 20,
    color: "black",
  },
  descriptionContainer: {
    margin: 10,
  },
  authorStyle: {
    fontSize: 20,
    color: "#757575",
  },
  authorContainer: {
    margin: 10,
  },
  headerContainer: {
    margin: 10,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  priceStyle: {
    fontSize: 20,
    color: "#2ad104",
    fontWeight: "bold",
  },
  priceContainer: {
    margin: 10,
    alignItems: "center",
  },
  buttonsContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    marginHorizontal: 40,
  },
});
