import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Chat, Profile, Maps, FriendProfile } from 'screens';

const Stack = createStackNavigator()

class MainRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Stack.Navigator
          initialRouteName='home'
          screenOptions={{
            headerShown: false,
            headerStyle: {
              borderBottomWidth: 0,
              elevation: 0
            }
          }}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="chat" component={Chat} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="friendProfile" component={FriendProfile} />
          <Stack.Screen name="maps" component={Maps} />
        </Stack.Navigator>
      </>
    )
  }
}


export default MainRoute;