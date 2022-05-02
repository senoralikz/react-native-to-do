import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import { auth } from "../firebaseConfig";

const DrawerContents = (props, { navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const currentUser = auth.currentUser;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => console.log("current user signed out:", currentUser.email))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(
        //   "Error Code:",
        //   errorCode,
        //   "------",
        //   "Error Message:",
        //   errorMessage
        // );
        Alert.alert(errorCode, errorMessage, { text: "Ok" });
      });
    // navigation.closeDrawer();
    // setUser("");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: user.photoURL }} style={styles.profilePic} />
          {currentUser.displayName ? (
            <Text style={styles.displayNameEmail}>
              {currentUser.displayName}
            </Text>
          ) : (
            <Text style={styles.displayNameEmail}>{currentUser.email}</Text>
          )}
        </View>
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
          <DrawerItem
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
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
  profileInfo: {
    paddingHorizontal: 10,
  },
  displayNameEmail: {
    justifyContent: "center",
  },
  profilePic: {
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  bottomDrawerSection: {
    marginBottom: 25,
  },
});
