import "react-native-gesture-handler";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import LogInScreen from "./screens/LogInScreen";
import HomeScreen from "./screens/HomeScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompletedTasksScreen from "./screens/CompletedTasksScreen";
import { TasksContext } from "./Helper/Context";
import { UserContext } from "./Helper/Context";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Header from "./components/Header";

import AuthStackRoutes from "./Routes/AuthStackRoutes";
import DrawerRoutes from "./Routes/DrawerRoutes";

export default function App() {
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, user, setUser }}>
      <NavigationContainer>
        {/* {user ? <AuthStackRoutes /> : <DrawerRoutes />} */}
        <DrawerRoutes />
      </NavigationContainer>
      <StatusBar style="auto" />
    </TasksContext.Provider>
  );
}
