import { View, Text, StyleSheet, Switch, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DueDate = ({ date, onChange, showDueDate, toggleDateSwitch }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dueDateToggle}>
          <Text>Due Date: </Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDateSwitch}
            value={showDueDate}
          />
        </View>
        {showDueDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            style={{ width: 150 }}
            minimumDate={new Date()}
          />
        )}
      </View>
    </View>
  );
};

export default DueDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  dueDateToggle: {
    flexDirection: "row",
  },
});
