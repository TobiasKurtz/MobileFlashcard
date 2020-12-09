import { createStackNavigator } from "@react-navigation/stack";
import AddDeck from '../AddDeck'
import React from "react"

const StackNewDeck = createStackNavigator();
export const StackNewDeckComponent = () => (
  <StackNewDeck.Navigator>
    <StackNewDeck.Screen
      name="New Deck"
      component={AddDeck}
      options={() => ({
        title: "New Deck",
        headerTitleAlign: "center",
      })}
    />
  </StackNewDeck.Navigator>
);