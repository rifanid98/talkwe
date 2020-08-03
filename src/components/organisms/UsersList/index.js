import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import { globalStyles as global, mapsStyles as maps } from 'assets';
import { getUsers, getUsersList } from 'modules';
import { connect } from 'react-redux';
import { LoadingIcon } from 'components';
import { getDistance } from 'geolib';
import { addFriend } from 'modules'
import { createFormData } from 'utils';


class UsersList extends Component {
  constructor(props) {
    super(props)
    const window = Dimensions.get('window');
    const { width, height } = window;
    const latitudeDelta = 0.0922;
    const longitudeDelta = latitudeDelta + (width / height)
    this.state = {
      usersList: [],
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
    this.getUsersList()
    console.log('didmount');
  }

  /**
   * API Services
   */
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
  addFriend = (friendID, friendName) => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    const data = {
      user_id1: id,
      user_id2: friendID
    }
    const formData = createFormData(data);
    token
      ? this.props.addFriend(token, formData)
        .then((res) => {
          console.log(res)
          if (res.value.status === 201) {
            this.getUsersList()
            Alert.alert('Friend request has been sent', `${friendName} will appear on the friends list if a friend request has been received`)
          }
        }).catch((error) => {
          console.log(error, `get users lists failed`)
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
    var dis = getDistance(coords1,coords2, 1);
    return dis/1000;
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
        <Text style={maps.label}>NEARBY USERS LIST</Text>
        {
          this.props.users.isLoading
            ? <LoadingIcon type={2} />
            : (this.state.usersList && this.state.usersList.length > 0)
              ? <ScrollView style={maps.listItems} showsVerticalScrollIndicator={false} >
                {
                  this.state.usersList.map((user, index) => {
                    if (this._getDistance(user.location) < 1 && user.id !== this.props.auth.data.id && user.user_id1 === null && user.location_share === 1) {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={maps.listItem}
                          onPress={() => this.props.goToFriendCoordinates(user.location)}
                        >
                          <Image
                            style={maps.itemImage}
                            source={{ uri: user.image }}
                          />
                          <View style={maps.itemContent}>
                            <Text style={maps.name}>{user.full_name}</Text>
                            <Text style={maps.status}>My status is here!</Text>
                          </View>
                          <View style={maps.itemAction}>
                            <Text style={maps.distance}>{this._getDistance(user.location)} KM</Text>
                            {
                              this.props.users.isLoading 
                                ? <View style={maps.button}>
                                    <LoadingIcon style={{height: 20, width: 20}} />
                                  </View>
                                : <Text
                                  style={maps.button}
                                  onPress={() => this.addFriend(user.id, user.full_name)}>ADD</Text>
                            }
                          </View>
                        </TouchableOpacity>
                      )
                    }
                  })
                }
                </ScrollView>
              : <Text
                style={{ alignSelf: 'flex-start', height: '100%', width: '100%' }}
                onPress={() => this.getUsersList()}
              >Nearby users not found.  Touch to reload.</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
})

const mapDispatchToProps = {
  getUsers,
  addFriend,
  getUsersList
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);