import React, { Component } from "react";
import {
  Text,
  Alert,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";

class AddDeck extends Component {
  state = {
    value: "",
  };
  onChangeText = (textValue) => this.setState({ value: textValue });

  onCreateDeck = () => {
    this.props.decks !== undefined && this.props.decks[this.state.value]
      ? Alert.alert(
          "Deck title already exists",
          "Please choose another title !",
          [{ text: "OK", onPress: () => this.setState({ value: "" }) }],
          { cancelable: false }
        )
      : this.props.dispatch(handleAddDeck(this.state.value)).then(() => {
          this.props.navigation.navigate("Deck", {
            DeckId: this.state.value,
          });

          this.setState({ value: "" });
        });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.text}>
              Insert title of your new Deck ?
            </Text>
            <TextInput
              placeholder={
                this.state.value === ""
                  ? "Type the title of the Deck Please."
                  : ""
              }
              style={styles.inputText}
              onChangeText={this.onChangeText}
              value={this.state.value}
            />
            <TouchableOpacity
              disabled={this.state.value === ""}
              style={this.state.value ? styles.button : styles.buttonDisabled}
              onPress={this.onCreateDeck}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = ({ decks }) => ({
  decks,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  inputText: {
    borderColor: "purple",
    borderWidth: 1,
    alignSelf: "center",
    width: "95%",
    marginBottom: 20,
    backgroundColor: "white",
    fontSize: 18,
    color: "purple",
    borderRadius: 9,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderColor: "#AA36F4",
    borderRadius: 20,
    height: 40,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#AA36F4",
  },
  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderColor: "#AA36F4",
    borderRadius: 20,
    height: 40,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#828282",
  },
});