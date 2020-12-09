import React, { Component } from "react";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { handleGetAllDecks } from "../actions";

class List extends Component {
  componentDidMount() {
    this.props.initilizeData();
  }
  render() {
console.log("deks", this.props)

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decksList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.deck}
              onPress={() =>
                this.props.navigation.navigate("Deck", { DeckId: item.title })
              }
            >
              <View>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={{ textAlign: "center" }}>
                  {item.questions ? item.questions.length : 0} cards
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  const decksList = [];
  decks &&
    Object.entries(decks).forEach(([key, value]) => {
      decksList.push(value);
    });
  return {
    decksList,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    initilizeData: () => {
      dispatch(handleGetAllDecks());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  deck: {
    padding: 10,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#AA36F4",
    margin: 9,
    marginBottom: 13,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});