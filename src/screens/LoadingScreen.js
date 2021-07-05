import React from "react";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <ActivityIndicator
      size="large"
      color="rgba(50,150,50,1)"
      style={{ flex: 1 }}
    />
  );
};

export default LoadingScreen;
