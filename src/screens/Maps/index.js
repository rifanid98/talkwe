import React, { Component } from 'react'
import { View, Text, Image, Platform, PermissionsAndroid, Dimensions } from 'react-native'
import { globalStyles as global, mapsStyles as maps, font, colorScheme as color } from 'assets';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Geolocation from 'react-native-geolocation-service';
import { getFriendsList, getUsersList } from 'modules';
import { connect } from 'react-redux';
import { LoadingIcon, FriendsList, UsersList } from 'components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
class Maps extends Component {
  constructor(props) {
    super(props)
    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitude = parseFloat(this.props.auth.data.location.split(',')[0]);
    const longitude = parseFloat(this.props.auth.data.location.split(',')[1]);
    const latitudeDelta = 0.0922;
    const longitudeDelta = 0.0922 + (width / height);
    this.state = {
      togglePanel: false,
      location: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
      },
      usersList: [],
    }
  }

  /**
   * Life Cycles
   */
  async componentDidMount() {
    await this.requestPermissions()
    this.findCoordinates()
    this.getFriendsList()
    this.getUsersList()
  }

  /**
   * API Services
   */
  getFriendsList = () => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    token
      ? this.props.getFriendsList(token, id)
        .then((res) => {
          this.setState({
            ...this.state,
            friendsList: this.props.friends.data
          })
        }).catch((error) => {
          console.log(error, `get friends lists failed`)
        })
      : console.log(`cannot find token`)
  }
  getUsersList = () => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    token
      ? this.props.getUsersList(token, id)
        .then((res) => {
          const usersList = res.value.data.data;
          this.setState({
            ...this.state,
            usersList: usersList
          })
        }).catch((error) => {
          console.log(error, `get users lists failed`)
        })
      : console.log(`cannot find token`)
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
   * Logics
   */
  goToFriendCoordinates = (coords) => {
    const latitude = parseFloat(coords.split(',')[0]);
    const longitude = parseFloat(coords.split(',')[1]);
    this.setState({
      ...this.state,
      location: {
        ...this.state.location,
        latitude: latitude,
        longitude: longitude
      }
    }, () => {
      this.mapView.animateToRegion(this.state.location, 2000);
    })
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
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(this.props.auth.data.location.split(',')[0]),
              longitude: parseFloat(this.props.auth.data.location.split(',')[1])
            }}
            title={this.props.auth.data.full_name.split(' ')[0]}
            description="Your position"
          >
            <Image source={{ uri: this.props.auth.data.image }} style={maps.markerImage} />
          </Marker>
          {/* FriendsList Markers */}
          {
            this.props.friends.data && this.props.friends.data.length > 0
              && this.props.friends.data.map((friend, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(friend.location.split(',')[0]),
                      longitude: parseFloat(friend.location.split(',')[1])
                    }}
                    title={friend.full_name.split(' ')[0].capitalize()}
                    description={`${friend.full_name.capitalize()}'s position`}
                  >
                    <Image source={{ uri: friend.image }} style={maps.markerImage} />
                  </Marker>
                )
              })
          }
          {/* UsersList Markers */}
          {
            this.state.usersList && this.state.usersList.length > 0
              && this.state.usersList.map((user, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(user.location.split(',')[0]),
                      longitude: parseFloat(user.location.split(',')[1])
                    }}
                    title={user.full_name.split(' ')[0].capitalize()}
                    description={`${user.full_name.capitalize()}'s position`}
                  >
                    <Image source={{ uri: user.image }} style={maps.markerImage} />
                  </Marker>
                )
              })
          }
        </MapView>
        <View style={{
          flex: 1
        }}>
          <Tab.Navigator
            initialRouteName="friendsList"
            backBehavior="initialRoute"
            tabBarOptions={{
              activeTintColor: color.accent,
              inactiveTintColor: 'grey',
              labelStyle: {
                fontSize: 20,
                fontFamily: font.heading
              },
              pressColor: color.accent,
              indicatorStyle: {
                backgroundColor: color.accent
              }
            }}
            lazy={true}
            removeClippedSubviews={true}
          >
            <Tab.Screen name="friendsList" options={{ title: 'FRIENDS LIST' }}>
              {() => <FriendsList goToFriendCoordinates={(coords) => this.goToFriendCoordinates(coords)} />}
            </Tab.Screen>
            <Tab.Screen name="usersList" options={{ title: 'USERS LIST' }}>
              {() => <UsersList goToFriendCoordinates={(coords) => this.goToFriendCoordinates(coords)} {...this.props}/>}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends,
})

const mapDispatchToProps = {
  getFriendsList,
  getUsersList
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);