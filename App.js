import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>To Do or Not To Do</Text>
      <View style={styles.border}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  border: {
    // justifyContent: "center",
    // alignItems: "flex-start",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
});
