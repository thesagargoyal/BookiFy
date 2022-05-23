import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

import firebase from "firebase";

const AddBook = ({ navigation }) => {
  const [description, setDescription] = React.useState();
  const [author, setAuthor] = React.useState();
  const [price, setPrice] = React.useState();
  const [bookName, setBookName] = React.useState();
  const [bookId, setBookId] = React.useState();

  const addBook = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to add this book ?",
      [
        {
          text: "Yes",
          onPress: () => {
            confirmAdd();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const confirmAdd = async () => {
    if (!bookName || !author || !price || !bookId || !description)
      return Alert.alert("Retry!!", "Please enter all the required fields!");
    if (bookId.length < 10)
      return Alert.alert("Retry!!", "Book ID must of 10 characters");

    const priceFlag = /^[1-9][0-9]*$/.test(price);
    await firebase.database().ref("bookData").push({
      bookName,
      author,
      price,
      description,
      bookId,
    });
    Alert.alert("Success!!", "Book added successfully...");
    navigation.replace("Dashboard");
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerStyle}>Add New Book</Text>
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
          label="Book ID (Unique)"
          value={bookId}
          onChangeText={(text) => setBookId(text)}
          theme={{ colors: { primary: "#2150f5" } }}
          multiline
          maxLength={10}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={addBook}
            theme={{ colors: { primary: "#2150f5" } }}
          >
            Add Book
          </Button>
        </View>
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
    </ScrollView>
  );
};

export default AddBook;

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
    padding: 5,
  },
});
