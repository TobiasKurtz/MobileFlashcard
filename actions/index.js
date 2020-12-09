import {
  getDecks,
  saveDeckTitle,
  saveCardToDeck,
  removeDeck,
} from "../utils/api";

export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const QUIZ = "QUIZ";
export const DELETE_DECK = "DELETE_DECK";

export function getAllDecks(decks) {
  return {
    type: GET_ALL_DECKS,
    decks,
  };
}

export function handleGetAllDecks() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      console.log("Magic data", decks)
      dispatch(getAllDecks(decks));
    });
  };
}

// Add Deck (title)
export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck, // deck : { title : "xxx", questions[{question: "xxx", answer: "zzzz"}]}
  };
}

export function handleAddDeck(title) {
  return (dispatch) => {
    return saveDeckTitle(title).then((deck) => {
      dispatch(addDeck(deck));
      return deck;
    });
  };
}

// Add card (question,answer) to Deck
export function addCard(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}
export function saveCard(deckId, card) {
  return (dispatch) => {
    return saveCardToDeck(deckId, card).then(() => {
      dispatch(addCard(deckId, card));
    });
  };
}

// Delete a deck
export function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId,
  };
}

export function handleDeleteDeck(deckId) {
  return (dispatch) => {
    return removeDeck(deckId).then(() => {
      dispatch(deleteDeck(deckId));
      return true;
    });
  };
}