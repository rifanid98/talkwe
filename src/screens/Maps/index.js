import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
import { globalStyles as global, mapsStyles as maps } from 'assets';
import MapView, { Marker } from 'react-native-maps';
import SlidingUpPanel from 'rn-sliding-up-panel'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class Maps extends Component {

  render() {
    return (
      <View style={[maps.container, global.relative]}>
        {/* header */}
        <View style={maps.header}>
          <Text style={maps.menuButton} onPress={() => this.props.navigation.goBack()}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
        </View>
        {/* map */}
        <MapView
          style={maps.maps}
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

        {/* panel */}
        <TouchableOpacity
          style={maps.panelButton}
          onPress={() => this._panel.show()}
        >
          <View style={maps.line}></View>
        </TouchableOpacity>
        <SlidingUpPanel ref={c => (this._panel = c)}>
          {dragHandler => (
            <View style={maps.panelContainer}>
              <View style={maps.dragHandler} {...dragHandler}>
                <View style={maps.line}></View>
              </View>
              <Text style={maps.label}>NEARBY FRIENDS LIST</Text>
              <ScrollView
                style={maps.listItems}
              >
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,].map((data, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={maps.listItem}
                        onPress={() => this.props.navigation.navigate('profile')}
                      >
                        <Image
                          style={maps.itemImage}
                          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        />
                        <View style={maps.itemContent}>
                          <Text style={maps.name}>Anne</Text>
                          <Text style={maps.status}>My status is here!</Text>
                        </View>
                        <View style={maps.itemAction}>
                          <Text style={maps.distance}>1KM</Text>
                          <Text style={maps.button}>ADD</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })                }
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}


export default Maps;