import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { sideDrawer } from "./sideDrawer";
import HeaderMenu from "../componenets/genericComponents/HeaderMenu";
import ProfileAvatar from "../componenets/genericComponents/ProfileAvatar";
import CreateProgramScreen from "../screens/ProgramsCreation/CreateProgramScreen";
import ProgramTargetsScreen from "../screens/ProgramsCreation/ProgramTargetsScreen";
import CreateItemsScreen from "../screens/ProgramsCreation/CreateItemsScreen";
import ProgramSummaryScreen from "../screens/ProgramsCreation/ProgramSummaryScreen";
import { options } from "./options";

const Stack = createStackNavigator();

export const mainStack = (user, programs) => {
  const headerTitle = (navigation) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={programs ? () => navigation.navigate("ראשי") : null}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          BeatFit
        </Text>
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={{ height: 50, width: 50 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator>
      {programs.nutrition && programs.training ? (
        <Stack.Screen
          name={"BeatFit"}
          children={() => sideDrawer()}
          options={({ navigation }) => ({
            headerMode: "screen",
            headerTitleAlign: "center",
            headerTitle: () => headerTitle(navigation),
            headerRight: () => {
              return (
                <View
                  style={{ flexDirection: "row-reverse", alignItems: "center" }}
                >
                  <ProfileAvatar imgSrc={user ? user.img : null} />
                  <Text
                    style={{
                      marginRight: 8,
                      marginLeft: 10,
                      fontSize: 18,
                    }}
                  >
                    היי, {user.fname}!
                  </Text>
                </View>
              );
            },
            headerLeft: () => <HeaderMenu navigation={navigation} />,
          })}
        />
      ) : (
        <Stack.Screen
          name="createProgram"
          component={CreateProgramScreen}
          options={options(headerTitle, user)}
        />
      )}
      <Stack.Screen
        name="programTargets"
        component={ProgramTargetsScreen}
        options={options("בנה תכנית", user)}
      />
      <Stack.Screen
        name="programItems"
        component={CreateItemsScreen}
        options={options("בנה תכנית", user)}
      />
      <Stack.Screen
        name="programSummary"
        component={ProgramSummaryScreen}
        options={options("סיכום תכנית", user)}
      />
    </Stack.Navigator>
  );
};
