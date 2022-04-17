import { View, Text, StyleSheet, Switch, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DueDate = ({ date, onChange, showDueDate, toggleDateSwitch }) => {
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState("date");
  // const [show, setShow] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   // setShow(false);
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  return (
    <View>
      <View style={styles.container}>
        <Text>Due Date: </Text>
        {/* <Switch
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDateSwitch}
          value={showDueDate}
        /> */}

        {/* {showDueDate && ( */}
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          style={{ width: 150 }}
          minimumDate={new Date()}
        />
      </View>
      {/* )} */}
    </View>
  );
};

export default DueDate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "flex-start",
  },
});
