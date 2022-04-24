import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";

const DrawerContents = (props) => {
  return (
    <View style={{ flex: 1, marginTop: 15 }}>
      <DrawerContentScrollView {...props}>
        <View>
          {/* <Text>DrawerContents</Text> */}
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            label="Completed Tasks"
            onPress={() => {
              props.navigation.navigate("TasksCompleted");
            }}
          />
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item label="Sign Out" onPress={() => alert("Signing Out")} />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContents;

const styles = StyleSheet.create({
  container: {
    // marginTop: 15,
  },
});
