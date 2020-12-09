import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleDeleteDeck } from "../actions/index";
import { connect } from "react-redux";

function Deck(props) {
  const deck = props.deck(props.route.params.DeckId);
  useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Confirm deleting ",
      "Do you want to delete this Deck?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            props
              .dispatch(handleDeleteDeck(deck.title))
              .then(() => props.navigation.goBack());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return deck ? (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={[styles.text, { fontSize: 18, color: "gray" }]}>
          {deck.questions ? deck.questions.length : 0} cards
        </Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("AddCard", { DeckId: deck.title });
          }}
        >
          <Text style={[styles.text, { color: "black" }]}>Add Card</Text>
        </TouchableOpacity>
        {deck.questions.length !== 0 && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#AA36F4" }]}
            disabled={deck.questions.length === 0}
            onPress={() => {
              props.navigation.navigate("Quiz", {
                DeckId: deck.title,
                mDeck: deck,
              });
            }}
          >
            <Text style={[styles.text, { color: "white" }]}>Start Quiz</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[{ backgroundColor: null }]}
          onPress={handleDelete}
        >
          <Text
            style={[
              styles.text,
              { color: "#FF1744", fontSize: 17, marginTop: 10 },
            ]}
          >
            Delete Deck {deck.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text>Going back...</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "center",
    padding: 10,
    margin: 15,
    borderColor: "#AA36F4",
    borderWidth: 2,
    borderRadius: 20,
  },
  btnGroup: {
    margin: 15,
    justifyContent: "space-evenly",
  },
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = ({ decks }) => {
  return {
    deck: (id) => decks && decks[id],
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);