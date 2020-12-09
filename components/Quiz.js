import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

function Quiz(props) {
  useEffect(() => {
    clearLocalNotification()
      .then(setLocalNotification)
      .catch((e) => console.log("error", e));
  }, []);

  const deck = props.route.params.mDeck;
  const [currentCard, nextCard] = useState(0);
  const [correctAnswer, addCorrectAnswer] = useState(0);
  const [cardFront, flipCard] = useState(true);
  const endQuiz = currentCard < deck.questions.length ? false : true;

  return (
    <View style={[styles.container, { backgroundColor: "#F5F5DC" }]}>
      <View>
        <Text style={[styles.text]}>Quiz on {deck.title}</Text>
        {endQuiz ? (
          <Text style={[styles.text, { color: "#AA36F4" }]}>{"Result"}</Text>
        ) : (
          <Text style={[styles.text, { color: "#AA36F4" }]}>
            question {currentCard + 1 + " "}of{" " + deck.questions.length}
          </Text>
        )}
      </View>
      {deck.questions.length > currentCard ? (
        // Front card
        cardFront ? (
          <View>
            <View style={styles.card}>
              <Text style={[styles.text, styles.resultText]}>Question:</Text>
              <Text
                style={[styles.text, { alignSelf: "flex-start", fontSize: 18 }]}
              >
                {deck.questions[currentCard].question}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: 15 }]}
              onPress={() => {
                flipCard(!cardFront);
              }}
            >
              <Text style={[styles.text, styles.btnText]}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Back card
          <View>
            <View style={[styles.card, { marginBottom: 15 }]}>
              <View>
                <View>
                  <Text style={[styles.text, styles.resultText]}>
                    Question:
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { alignSelf: "flex-start", fontSize: 18 },
                    ]}
                  >
                    {deck.questions[currentCard].question}
                  </Text>
                </View>
                <View style={styles.answerPane}>
                  <Text style={[styles.text, styles.resultText]}>Answer:</Text>
                  <Text
                    style={[styles.text, { textAlign: "left", fontSize: 18 }]}
                  >
                    {deck.questions[currentCard].answer}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.correctIncorectBtns}>
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() => {
                    nextCard(currentCard + 1);
                    addCorrectAnswer(correctAnswer + 1);
                    flipCard(!cardFront);
                  }}
                  style={[styles.button, { backgroundColor: "#64DD17" }]}
                >
                  <Text style={[styles.text, styles.btnText]}>correct</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  onPress={() => {
                    nextCard(currentCard + 1);
                    flipCard(!cardFront);
                  }}
                  style={[styles.button, { backgroundColor: "#F76055" }]}
                >
                  <Text style={[styles.text, styles.btnText]}>incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
      ) : (
        // The result screen (End of the quiz)
        <View>
          <View style={styles.card}>
            <Text style={styles.text}>
              {correctAnswer} of {deck.questions.length} correcte
              {" " + (correctAnswer / deck.questions.length).toFixed(2) * 100} %
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { margin: 15 }]}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={[styles.text, styles.btnText]}>Go back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              nextCard(currentCard - deck.questions.length);
              addCorrectAnswer(0);
            }}
          >
            <Text style={[styles.text, styles.btnText]}>Restart the quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Quiz;

const styles = StyleSheet.create({
  btnText: { color: "white", fontSize: 18 },
  answerPane: {
    borderWidth: 1,
    borderColor: "#AA36F4",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
    backgroundColor: "#CCFF90",
  },
  resultText: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontStyle: "italic",
  },
  correctIncorectBtns: {
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: "#AA36F4",
    margin: 9,
    marginBottom: 13,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  card: {
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
  button: {
    borderColor: "#AA36F4",
    borderRadius: 20,
    height: 40,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#AA36F4",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});