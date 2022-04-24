import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/LogInScreen";
import HomeScreen from "../screens/HomeScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="LogIn" component={LogInScreen} /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{ title: "To Do or Not To Do" }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerBackTitleVisible: false,
          headerTitleAlign: "left",
        }}
      /> */}
      <Stack.Screen
        name="EditTaskScreen"
        component={EditTaskScreen}
        options={{
          title: "Edit Task",
          headerBackTitleVisible: false,
        }}
      />
      {/* <Stack.Screen
        name="Tasks Completed"
        component={CompletedTasksScreen}
        options={{
          title: "Tasks Completed",
          headerBackTitleVisible: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackRoutes;
