/**
 * React Navigation
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

/**
 * @Redux
 */
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from 'modules';
/**
 * Screens's Routes
 */
import { RootRoute } from 'routes';

const App = (props) => {
  const persistor = persistStore(store);
  useEffect(() => {
    SplashScreen.hide();
  })
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootRoute />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
