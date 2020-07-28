/**
 * React Navigation
 */
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * React
 */
import React, { Component } from 'react'

/**
 * Routes
 */
import MainRoute from './MainRoute';
import AuthRoute from './AuthRoute';

/**
 * Redux
 */
import { connect } from 'react-redux';

const Stack = createStackNavigator()
class RootRoute extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Stack.Navigator
          initialRouteName='main'
          screenOptions={{
            headerShown: false
          }}
        >
          {/* {
            this.props.auth.data.tokenLogin
              ? <Stack.Screen name="main" component={MainRoute} />
              : <Stack.Screen name="auth" component={AuthRoute} />
          } */}
          <Stack.Screen name="main" component={MainRoute} />
        </Stack.Navigator>
      </>
    )
  }
}
const mapStateToProps = state => ({
  apps: state.apps,
  auth: state.auth
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRoute);
