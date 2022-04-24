import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const LogInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Log In Screen</Text>
      <Button
        title="To Home Screen"
        onPress={() => navigation.replace("Home")}
      />
      <Button title="Sign up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
