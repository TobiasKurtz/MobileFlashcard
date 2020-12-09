import AsyncStorage from "@react-native-community/async-storage";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

function initialData() {
  return {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces",
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event",
        },
      ],
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared.",
        },
      ],
    },
  };
}

export async function getDecks() {
  try {
    //to reset data incomment the next line
     const clear = await AsyncStorage.clear();
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results) {
      console.log('ABCDEFG')
      const data = JSON.parse(results);
      return data;
    } else {
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(initialData())
      );
      return initialData();
    }
  } catch (error) {
    await AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(initialData())
    );
    return initialData();
  }
}

export async function saveDeckTitle(title) {
  const deck = {
    [title]: {
      title: title,
      questions: [],
    },
  };

  await AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      ...deck,
    })
  );
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  return deck;
}

export async function saveCardToDeck(deckId, card) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    const deck = data[deckId];
    deck.questions = deck.questions.concat([card]);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [deckId]: deck,
      })
    );
    return card;
  }
}

export async function removeDeck(deckId) {
  const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    delete data[deckId];
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  return {};
}