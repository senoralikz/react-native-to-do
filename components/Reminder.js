import { View, Text, Switch, StyleSheet } from "react-native";

const Reminder = ({ isReminderEnabled, toggleSwitch }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Reminder: </Text>
      <Switch
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isReminderEnabled}
      />
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
