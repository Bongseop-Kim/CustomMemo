import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import Home from './Home';
import Edit from './Edit';
import EditDropdown from './EditDropdown';

type RootStackParamList = {
  Home: undefined;
  Edit: undefined;
  EditDropdown: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="EditDropdown" component={EditDropdown} />
    </Stack.Navigator>
  );
}
export default RootStack;
