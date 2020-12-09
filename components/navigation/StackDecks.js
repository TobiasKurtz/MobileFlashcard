import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import List from "../List";
import Deck from "../Deck";
import AddCard from "../AddCard";
import Quiz from "../Quiz";

const StackDecks = createStackNavigator();

export const StackDecksComponent = () => (
    <StackDecks.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode="float"
      animation="fade"
    >
      <StackDecks.Screen
        name="DecksList"
        component={List}
        options={() => ({
          title: "Deck List",
          headerTitleAlign: "center",
        })}
      />
      <StackDecks.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => {
          return {
            title: route.params.DeckId,
            headerTitleAlign: "center",
            headerTruncatedBackTitle: true,
            headerBackTitle: route.params.DeckId,
          };
        }}
      />
      <StackDecks.Screen
        name="AddCard"
        component={AddCard}
        options={({ route }) => {
          return {
            title: "Add Card to " + route.params.DeckId,
            headerTitleAlign: "center",
            headerTruncatedBackTitle: true,
            headerBackTitle: route.params.DeckId,
          };
        }}
      />
      <StackDecks.Screen
        name="Quiz"
        component={Quiz}
        options={({ route }) => {
          return {
            title: "Take Quiz : " + route.params.DeckId,
            headerTitleAlign: "center",
            headerTruncatedBackTitle: true,
            headerBackTitle: route.params.DeckId,
            tabBarVisible: false,
          };
        }}
      />
    </StackDecks.Navigator>
);