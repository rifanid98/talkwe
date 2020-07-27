import React from 'react';
import { View } from 'react-native';
import { mainStyles as styles } from 'assets';
import MapView, { Marker } from 'react-native-maps';

const Maps = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: -6.882329,
          longitude: 109.121874,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          coordinate={{ latitude: -6.882329, longitude: 109.121874 }}
          title="Tegal"
          description="Ini Tegal"
        />
      </MapView>
    </View>
  );
};

export default Maps;
