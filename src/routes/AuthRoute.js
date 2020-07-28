import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register } from 'screens';

const Stack = createStackNavigator()

class AuthRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Stack.Navigator
          initialRouteName='login'
          screenOptions={{
          headerShown: false,
          headerTitle: null
        }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      </>
    )
  }
}


export default AuthRoute;