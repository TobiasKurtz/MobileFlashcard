import AsyncStorage from "@react-native-community/async-storage";

const FLASHCARDS_STORAGE_KEY = "flashcards_data";

function initialData() {
  return {
    Germany: {
      title: "Germany",
      questions: [
        {
          question: "What is the capital city of Germany?",
          answer: "Germany",
        },
        {
          question: "What is the Population of Germany?",
          answer: "83 million people.",
        },
        {
          question: "How many Bundesländer are in Germany?",
          answer: "16",
        },
      ],
    },
    Math: {
      title: "Math",
      questions: [
        {
          question: "What is the first prime number?",
          answer: "2",
        },
        {
          question: "What is 0 to the power of 0?",
          answer: "1",
        },
        {
          question: "What is: -(7-2+(2*3+4)/(-5))?",
          answer: "-3",
        },
      ],
    },
  };
}

export async function getDecks() {
  try {    
    const clear = await AsyncStorage.clear();
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results) {
      console.log('What is here')
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