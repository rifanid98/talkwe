import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Maps, Realtime } from 'screens';

const Stack = createStackNavigator();

const RootRoute = (props) => {
  return (
    <Stack.Navigator initialRouteName="realtime">
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="maps" component={Maps} />
      <Stack.Screen name="realtime" component={Realtime} />
    </Stack.Navigator>
  );
};

export default RootRoute;
