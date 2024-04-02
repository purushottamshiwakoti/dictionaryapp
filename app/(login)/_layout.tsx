// AppNavigator.js
import { Stack } from "expo-router";
import React from "react";

const AppNavigator = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AppNavigator;
