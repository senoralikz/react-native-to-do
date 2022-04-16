import { View, Text, Switch, StyleSheet } from "react-native";

const Reminder = ({ isEnabled, toggleSwitch }) => {
  return (
    <View style={styles.container}>
      <Text>Reminder</Text>
      <Switch
        // trackColor={{ false: "#767577", true: "#81b0ff" }}
        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
