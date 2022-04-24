import "react-native-gesture-handler";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import LogInScreen from "./screens/LogInScreen";
import HomeScreen from "./screens/HomeScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CompletedTasksScreen from "./screens/CompletedTasksScreen";
import { TasksContext } from "./Helper/Context";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Header from "./components/Header";

import StackRoutes from "./Routes/StackRoutes";
import DrawerRoutes from "./Routes/DrawerRoutes";

// const DrawerRoutes = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerPosition: "right",
//         swipeEnabled: false,
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen
//         name="TasksCompleted"
//         component={CompletedTasksScreen}
//         option={{
//           title: "Tasks Completed",
//           headerBackTitleVisible: false,
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        {/* <StackRoutes /> */}
        <DrawerRoutes />
      </NavigationContainer>
      <StatusBar style="auto" />
    </TasksContext.Provider>
  );
}
