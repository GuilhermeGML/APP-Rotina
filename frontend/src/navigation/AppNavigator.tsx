import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import PrimeiraScreen from "../screens/PrimeiraScreen"; // Rotinas/Tarefas
import SegundaScreen from "../screens/SegundaScreen";   // Projetos

export type RootStackParamList = {
  Primeira: undefined; // Rotinas/Tarefas
  Segunda: undefined;  // Projetos
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Primeira">
        <Stack.Screen 
          name="Primeira" 
          component={PrimeiraScreen} 
          options={{ title: "Minhas Rotinas" }} 
        />
        <Stack.Screen 
          name="Segunda" 
          component={SegundaScreen} 
          options={{ title: "Meus Projetos" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}