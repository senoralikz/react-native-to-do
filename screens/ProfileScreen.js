import { StyleSheet, Text, View, Button } from "react-native";
import React, { useLayoutEffect } from "react";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Tasks Completed"
        onPress={() => navigation.navigate("Tasks Completed")}
      />
      <View>
        <Button title="Log out" onPress={() => navigation.replace("LogIn")} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
});
