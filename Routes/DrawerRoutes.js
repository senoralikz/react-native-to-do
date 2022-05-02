import { View, Text, Pressable } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackRoutes from "./StackRoutes";
import DrawerContents from "../screens/DrawerContents";
import HomeScreen from "../screens/HomeScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContents {...props} />}
      screenOptions={{
        //   headerLeft: () => (
        //     <Pressable onPress={() => navigation.openDrawer()}>
        //       {/* <Feather name="menu" size={24} color="black" /> */}
        //       <MaterialCommunityIcons
        //         name="account-circle"
        //         size={24}
        //         color="black"
        //       />
        //     </Pressable>
        //   ),
        drawerType: "front",
        swipeEnabled: false,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={StackRoutes}
        options={{ title: "To Do or Not To Do" }}
      />
      <Drawer.Screen
        name="TasksCompleted"
        component={CompletedTasksScreen}
        options={{ title: "Completed Tasks" }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
