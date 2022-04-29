import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
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
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setUser(user);
        console.log("signed in with user (from App.js):", user);
      } else {
        // User is signed out
        // ...
        console.log("user logged out");
        setUser("");
        console.log("signed out user (from App.js):", user);
      }
    });
    return unsubAuth;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TasksContext.Provider value={{ tasks, setTasks, user, setUser }}>
        <NavigationContainer>
          {!user ? <AuthStackRoutes /> : <DrawerRoutes />}
          {/* <DrawerRoutes /> */}
        </NavigationContainer>
        <StatusBar style="auto" />
      </TasksContext.Provider>
    </UserContext.Provider>
  );
}
