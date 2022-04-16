import { useState, createContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import EditTaskScreen from "./components/EditTaskScreen";
import { TasksContext } from "./Helper/Context";

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "To Do or Not To Do" }}
          />
          <Stack.Screen
            name="EditTaskScreen"
            component={EditTaskScreen}
            options={{ title: "Edit Task" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksContext.Provider>
  );
}
