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
    fontSize: 50,
    textAlign: "center",
    color:"#5f9ea0",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  deck: {
    padding: 10,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "blue",
    margin: 9,
    marginBottom: 13,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },    
    shadowRadius: 5,
  },
});