import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image, Platform, PermissionsAndroid, Dimensions } from 'react-native'
import { globalStyles as global, mapsStyles as maps } from 'assets';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Geolocation from 'react-native-geolocation-service';

class Maps extends Component {
  constructor(props) {
    super(props)
    const window = Dimensions.get('window');
    const { width, height } = window;
    const longitudeDelta = 0.0922 + (width / height)
    this.state = {
      togglePanel: false,
      location: {
        latitude: -6.2265687,
        longitude: 106.8544006,
        latitudeDelta: 0.0922,
        longitudeDelta: longitudeDelta
      }
    }
  }

  /**
   * Life Cycles
   */
  async componentDidMount() {
    await this.requestPermissions()
    this.findCoordinates()
  }

  /**
   * Geolocation API
   */
  async requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }
  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          ...this.state,
          location: {
            ...this.state.location,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }, () => {
            this.mapView.animateToRegion(this.state.location, 2000);
        })
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  /**
   * DOM Render
   */
  render() {
    return (
      <View style={[maps.container, global.relative]}>
        {/* header */}
        <View style={maps.header}>
          <Text style={maps.menuButton} onPress={() => this.props.navigation.goBack()}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
        </View>
        {/* map */}
        <MapView
          ref={(ref) => this.mapView = ref}
          style={maps.maps}
          initialRegion={{
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude,
            latitudeDelta: this.state.location.latitudeDelta,
            longitudeDelta: this.state.location.longitudeDelta,
          }}
          animateToRegion={{
            region: this.state.location,
            duration: 1000
          }}
          showsUserLocation={true}
        >
          <Marker
            draggable
            coordinate={this.state.location}
            title="My Location"
            description="This is your current position"
          />
        </MapView>
        {
          this.state.location.latitude !== 0 && this.state.location.longitude !== 0
            ? (
              <>
              </>
            )
            : <Text>Loading</Text>
        }
        {/* panel */}
        {
          this.state.togglePanel
            ? (
              <>
                <View style={maps.panel}>
                  <TouchableOpacity
                    style={maps.panelButton}
                    onPress={() => this.setState({ ...this.state, togglePanel: !this.state.togglePanel })}
                  >
                    <View style={maps.line}></View>
                  </TouchableOpacity>
                  <Text style={maps.label}>NEARBY FRIENDS LIST</Text>
                  <ScrollView
                    style={maps.listItems}
                    showsVerticalScrollIndicator={false}
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
                      })}
                  </ScrollView>
                </View>
              </>
            )
            : (
              <>
                <TouchableOpacity
                  style={maps.panelButtonToggle}
                  onPress={() => this.setState({ ...this.state, togglePanel: !this.state.togglePanel })}
                >
                  <View style={maps.line}></View>
                </TouchableOpacity>
              </>
            )
        }
         </View>
    );
  }
}


export default Maps;