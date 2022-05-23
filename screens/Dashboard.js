import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import firebase from "firebase";

export default function Dashboard({ navigation }) {
  const [bookData, setBookData] = useState([]);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setName(firebase.auth().currentUser.displayName);
    getData();
  }, []);

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

  useEffect(() => {}, [name]);

  const getData = async () => {
    await firebase
      .database()
      .ref("bookData")
      .on("value", (snap) => {
        const booksArray = [];
        for (var id in snap.val()) {
          const bookObject = {
            author: snap.val()[id].author,
            bookId: snap.val()[id].bookId,
            bookName: snap.val()[id].bookName,
            description: snap.val()[id].description,
            price: snap.val()[id].price,
            id: id,
          };
          booksArray.push(bookObject);
        }
        setBookData(booksArray);
      });
  };

  const logOut = () => {
    return Alert.alert("Are your sure?", "Are you sure you want to Log Out ?", [
      {
        text: "Yes",
        onPress: () => {
          firebase.auth().signOut();
        },
      },

      {
        text: "No",
      },
    ]);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameStyle}>Hey, {name} !</Text>
      </View>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButtonsStyle} onPress={logOut}>
          <Text style={styles.topButtonsTextStyle}>Log Out </Text>
        </TouchableOpacity>
        {isAdmin && (
          <TouchableOpacity
            style={styles.topButtonsStyle}
            onPress={() => {
              navigation.push("AddBook");
            }}
          >
            <Text style={styles.topButtonsTextStyle}>Add Book</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.booksContainer}>
        {bookData.map((book) => {
          return (
            <TouchableOpacity
              style={styles.bookCard}
              onPress={() => navigation.push("Description", { data: book })}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>{book.bookName}</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionStyle}>
                  {book.description.length > 40
                    ? book.description.substring(0, 40) + "..."
                    : book.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
  },
  topButtonsContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  topButtonsTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  nameContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  topButtonsStyle: {
    backgroundColor: "#2150f5",
    padding: 10,
    borderRadius: 15,
    margin: 10,
  },
  nameStyle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  bookCard: {
    margin: 4,
    borderRadius: 15,
    backgroundColor: "white",
  },
  headerStyle: {
    fontSize: 25,
    marginBottom: 6,
    fontWeight: "bold",
  },
  headerContainer: {
    margin: 10,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  descriptionStyle: {
    fontSize: 20,
    color: "#757575",
  },
  descriptionContainer: {
    margin: 10,
  },
  booksContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
