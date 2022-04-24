import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.drawerButton}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title}>To Do or Not To Do</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    marginRight: 15,
  },
  drawerButton: {
    // marginRight: 15,
  },
});
