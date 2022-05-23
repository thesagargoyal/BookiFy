import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import firebase from "firebase";

import { TextInput, Button } from "react-native-paper";

export default function Edit({ route, navigation }) {
  const [description, setDescription] = useState();
  const [author, setAuthor] = useState();
  const [price, setPrice] = useState();
  const [bookName, setBookName] = useState();
  const [bookId, setBookId] = useState();
  const [documentId, setDocumentId] = useState();

  useEffect(() => {
    const { data } = route.params;
    setDescription(data.description);
    setBookName(data.bookName);
    setPrice(data.price);
    setAuthor(data.author);
    setBookId(data.bookId);
    setDocumentId(data.id);
  }, []);

  const save = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to save these changes ?",
      [
        {
          text: "Yes",
          onPress: () => {
            confirmSave();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const confirmSave = async () => {
    if (!bookName || !author || !price || !bookId || !description)
      return Alert.alert("Retry!!", "Please enter all the required fields!");
    if (bookId.length < 10)
      return Alert.alert("Retry!!", "Book ID must of 10 characters");

    const priceFlag = /^[1-9][0-9]*$/.test(price);

    if (!priceFlag) return Alert.alert("Retry!!", "Enter valid price");

    await firebase
      .database()
      .ref("bookData/" + documentId)
      .update({
        bookName: bookName,
        price: price,
        author: author,
        description: description,
        bookId: bookId,
      });

    Alert.alert("Success!!", "Details updated successfully");
    navigation.replace("Dashboard");
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>Edit Book Details</Text>
      </View>
      <View style={styles.fieldsContainer}>
        <TextInput
          mode="outlined"
          label="Book Name"
          value={bookName}
          onChangeText={(text) => setBookName(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          maxLength={20}
        />
        <TextInput
          mode="outlined"
          label="Author Name"
          value={author}
          onChangeText={(text) => setAuthor(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          maxLength={20}
        />
        <TextInput
          mode="outlined"
          label="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          theme={{ colors: { primary: "#2150f5" } }}
        />
        <TextInput
          mode="outlined"
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          multiline
          maxLength={100}
        />
        <TextInput
          mode="outlined"
          label="Book ID(Unique)"
          value={bookId}
          onChangeText={(text) => setBookId(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          maxLength={10}
          multiline
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={save}
            theme={{ colors: { primary: "#2150f5" } }}
          >
            Save
          </Button>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.pop()}
              theme={{ colors: { primary: "#2150f5" } }}
            >
              Go Back
            </Button>
          </View>
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
  headerContainer: {
    alignItems: "center",
  },
  headerStyle: {
    fontSize: 30,
  },
  fieldsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  buttonsContainer: {
    padding: 40,
  },
  buttonContainer: {
    paddingTop: 10,
  },
});
