import "react-native-gesture-handler";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      setUser(user);
      console.log(user);
    } else {
      // User is signed out
      // ...
      setUser("");
    }
  });

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
