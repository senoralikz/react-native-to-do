import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { getAuth } from "firebase/auth";
// import { auth } from "../firebaseConfig";

const DrawerContents = (props, { navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => console.log("current user signed out:", currentUser.email));
    navigation.closeDrawer();
    setUser("");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Text style={{ paddingHorizontal: 15 }}>{user.email}</Text>
        <View>
          {/* <Text>DrawerContents</Text> */}
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate("HomeScreen");
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
        <Drawer.Item label="Sign Out" onPress={handleSignOut} />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 25,
  },
});
