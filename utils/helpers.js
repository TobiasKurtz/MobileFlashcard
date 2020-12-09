import AsyncStorage from "@react-native-community/async-storage";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Flashcard:notifications";

export async function clearLocalNotification() {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
  } catch (error) {
    console.log("error", err.message);
  }
  return Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: 'Quiz of today"!',
    body: "👋 Don't forget to take the quiz of today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(18);
              tomorrow.setMinutes(0);
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day",
                }
              ).catch((e) => console.log("error:", e));
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
          .catch((e) => console.log("error:", e));
      }
    })
    .catch((e) => console.log("error:", e));
}