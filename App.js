import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./screens/LogInScreen";
import HomeScreen from "./screens/HomeScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompletedTasksScreen from "./screens/CompletedTasksScreen";
import { TasksContext } from "./Helper/Context";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: "Profile",
              headerBackTitleVisible: false,
              headerTitleAlign: "left",
            }}
          />
          <Stack.Screen
            name="EditTaskScreen"
            component={EditTaskScreen}
            options={{
              title: "Edit Task",
              headerBackTitleVisible: false,
              headerTitleAlign: "left",
            }}
          />
          <Stack.Screen
            name="Tasks Completed"
            component={CompletedTasksScreen}
            options={{
              title: "Tasks Completed",
              headerBackTitleVisible: false,
              headerTitleAlign: "left",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </TasksContext.Provider>
  );
}
