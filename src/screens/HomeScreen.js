import React, { useContext } from "react";
import { ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import Goals from "../componenets/homeComponents/Goals";
import { Context as ProgramContext } from "../context/ProgramContext";
import { getChartData } from "../functions/homeFunctions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  console.log("test");
  const {
    state: { programs },
  } = useContext(ProgramContext);

  const trainingsData = getChartData(programs.training);
  const nutritionData = getChartData(programs.nutrition);

  const goals = [
    {
      type: "אימונים",
      name: "עמדת ביעד ב-",
      targetType: "מהאימונים עד כה",
      value: `${Math.round(programs.training.completedRate * 100)}%`,
    },
    {
      type: "תזונה",
      name: "עמדת ביעד ב-",
      targetType: "מהימים עד כה",
      value: `${Math.round(programs.nutrition.completedRate * 100)}%`,
    },
  ];

  return (
    <ScrollView>
      <Text>test</Text>
      {/* <Goals
        goals={goals}
        trainingsData={trainingsData}
        nutritionData={nutritionData}
      /> */}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  goalsContainer: {},
  goalItem: {
    borderColor: "grey",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 20,
    width: windowWidth * 0.8,
    height: windowHeight * 0.35,
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
