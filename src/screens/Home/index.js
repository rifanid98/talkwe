import React from 'react';
import { Text, View } from 'react-native';
import { mainStyles as styles } from 'assets';

const Home = (props) => {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => props.navigation.navigate('maps')}>
          Maps
        </Text>
        <Text
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => props.navigation.navigate('realtime')}>
          Realtime
        </Text>
      </View>
    </>
  );
};

export default Home;
