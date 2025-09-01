import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import SegundaScreen from "../screens/SegundaScreen";
import TerceiraScreen from "../screens/TerceiraScreen";

export type RootStackParamList = {
  Home: undefined;
  Segunda: undefined;
  Terceira: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
        <Stack.Screen name="Segunda" component={SegundaScreen} />
        <Stack.Screen name="Terceira" component={TerceiraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
