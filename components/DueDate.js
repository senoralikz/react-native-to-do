import { View, Text, StyleSheet, Switch, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DueDate = ({ date, onChange, showDueDate, toggleDateSwitch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dueDateToggle}>
        <Text style={{ fontSize: 18 }}>Due Date: </Text>
        <Switch
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDateSwitch}
          value={showDueDate}
        />
      </View>
      <View style={showDueDate && styles.dueDateCalendar}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          style={{ width: 150 }}
          minimumDate={new Date()}
          disabled={!showDueDate}
        />
      </View>
    </View>
  );
};

export default DueDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  dueDateToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueDateCalendar: {
    color: "#ecf0f1",
  },
});
