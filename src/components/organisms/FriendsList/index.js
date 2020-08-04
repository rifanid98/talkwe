import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions } from 'react-native'
import { globalStyles as global, mapsStyles as maps } from 'assets';
import { getFriendsList } from 'modules';
import { connect } from 'react-redux';
import { LoadingIcon } from 'components';
import { getDistance } from 'geolib';

class FriendsList extends Component {
  constructor(props) {
    super(props)
    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitudeDelta = 0.0922;
    const longitudeDelta = latitudeDelta + (width / height)
    this.state = {
      togglePanel: false,
      location: {
        latitude: -6.2265687,
        longitude: 106.8544006,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
      }
    }
  }

  /**
   * Life Cycles
   */
  async componentDidMount() {
    this.getFriendsList()
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

  /**
   * Logics
   */
  _getDistance = (coords) => {
    const coords1 = {
      latitude: parseFloat(this.props.auth.data.location.split(',')[0]),
      longitude: parseFloat(this.props.auth.data.location.split(',')[1])
    }
    const coords2 = {
      latitude: parseFloat(coords.split(',')[0]),
      longitude: parseFloat(coords.split(',')[1])
    }
    var dis = getDistance(
      { latitude: coords1.latitude, longitude: coords1.longitude },
      { latitude: coords2.latitude, longitude: coords2.longitude },
    );
    return `${dis / 1000} KM`
    // alert(`Distance\n${dis} Meter\nor\n${dis / 1000} KM`);
  };
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
      <View style={maps.panel}>
        <Text style={maps.label}>NEARBY FRIENDS LIST</Text>
        {
          this.props.friends.isLoading
            ? <LoadingIcon type={2} />
            : (this.props.friends.data && this.props.friends.data.length > 0)
            && <ScrollView style={maps.listItems} showsVerticalScrollIndicator={false} >
              {
                this.props.friends.data.map((friend, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={maps.listItem}
                      onPress={() => this.props.goToFriendCoordinates(friend.location)}
                    >
                      <View style={global.relative}>
                        <Image
                          style={maps.itemImage}
                          source={{ uri: friend.image }}
                        />
                        {friend.online === 0
                          ? <View style={{
                            height: 12,
                            width: 12,
                            backgroundColor: 'lightgrey',
                            borderRadius: 100,
                            marginRight: 5,
                            position: 'absolute',
                            right: -5,
                            bottom: 5
                          }}></View>
                          : <View style={{
                            height: 12,
                            width: 12,
                            backgroundColor: 'lightgreen',
                            borderRadius: 100,
                            marginRight: 5,
                            position: 'absolute',
                            right: -5,
                            bottom: 5
                          }}></View>}
                      </View>
                      <View style={maps.itemContent}>
                        <Text style={maps.name}>{friend.full_name}</Text>
                        <Text style={maps.status}>My status is here!</Text>
                      </View>
                      <View style={maps.itemAction}>
                        <Text style={maps.distance}>{this._getDistance(friend.location)}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
        }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);