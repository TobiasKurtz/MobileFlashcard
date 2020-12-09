import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from "redux";
import middleware from "./middleware";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import { StackDecksComponent } from "./components/navigation/StackDecks";
import { StackNewDeckComponent } from "./components/navigation/StackNewDeck";
import { setLocalNotification } from "./utils/helpers";

const Tab = createBottomTabNavigator();
function App() {
  React.useEffect(() => {
    setLocalNotification();
  }, []);

  return (
    <Provider store={createStore(reducer, middleware)}>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "StackDecksComponent") {
                iconName = focused ? "ios-list-box" : "ios-list";
              } else if (route.name === "StackNewDeckComponent") {
                iconName = focused
                  ? "ios-add-circle"
                  : "ios-add-circle-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#AA36F4",
            inactiveTintColor: "gray",
            tabBarVisible: false,
          }}
        >
          <Tab.Screen
            name="StackDecksComponent"
            component={StackDecksComponent}
            options={{ title: "Decks List" }}
          />
          <Tab.Screen
            name="StackNewDeckComponent"
            component={StackNewDeckComponent}
            options={{ title: "Add Deck" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default App;