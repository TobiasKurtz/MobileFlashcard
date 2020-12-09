import React, { useRef } from "react";
import {
  Text,
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
import { saveCard } from "../actions/index";

function AddCard(props) {
  const [question, onChangeTextQuestion] = React.useState("");
  const [answer, onChangeTextAnswer] = React.useState("");
  const questionRef = useRef(null);
  const answerRef = useRef(null);
  const validInput = answer === "" || question === "";
  const saveCardToDeck = () => {
    props
      .dispatch(
        saveCard(props.route.params.DeckId, {
          question: question,
          answer: answer,
        })
      )
      .then(() => props.navigation.goBack());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => onChangeTextQuestion(text)}
            value={question}
            placeholder="Question..."
            returnKeyType="next"
            ref={questionRef}
            onSubmitEditing={() => answerRef.current.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={styles.inputText}
            onChangeText={(text) => onChangeTextAnswer(text)}
            value={answer}
            placeholder="Answer of the Question..."
            ref={answerRef}
          />
          <TouchableOpacity
            disabled={validInput}
            style={validInput ? styles.buttonDisabled : styles.button}
            onPress={saveCardToDeck}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(AddCard);

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