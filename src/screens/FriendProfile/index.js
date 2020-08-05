import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { globalStyles as global, profileStyles as profile } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { logout, getDetailUser, getAddress } from 'modules';
import io from 'socket.io-client';
import { appConfig } from 'configs';
import { BadgeOnlineStatus } from 'components';

class FriendProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMount: false
    }
  }

  /**
   * LifeCycles
   */
  componentDidMount() {
    this.getUserInfo()
    this.getAddress()
    this._socketio()
  }

  /**
   * API Services
   */
  getUserInfo = () => {
    const token = this.props.auth.data.tokenLogin;
    const friendID = this.props.route.params.senderID;
    this.props.getDetailUser(token, friendID)
      .then(res => {
        this.setState({
          ...this.state,
          isMount: true
        })
      })
      .catch(error => {
        console.log(error)
        let errorMessage = 'Please try again';
        if (error.response !== undefined) {
          if (error.response.data) {
            if (error.response.data.message) {
              errorMessage = error.response.data.message;
            }
          }
        }
        // Alert.alert('Update Profile Failed', errorMessage)
      });
  }
  getAddress = () => {
    if (this.props.users.data.length > 0) {
      const latlang = this.props.users.data[0].location;
      this.props.getAddress(latlang)
        .then(res => {

        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  /**
   * Socket.IO Services
   */
  _socketio = () => {
    this.socket = io(appConfig.url.origin);
    this.socket.on('refresh', () => {
      this.getUserInfo()
    });
  }
  render() {
    return (
      <>
        <View style={[profile.container, global.relative]}>
          {/* header */}
          <View style={profile.header}>
            <Text style={profile.menuButton} onPress={() => this.props.navigation.goBack()}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
          </View>
          {/* profile */}
          <View style={profile.profile}>
            {
              this.props.users.isLoading && this.props.isMount === false
                ? <Text>Loading</Text>
                : this.props.users.data 
                  ? this.props.users.data.length > 0
                    ? (
                      <>
                        <Image
                          style={profile.image}
                          source={{ uri: this.props.users.data[0].image }}
                        />
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          {
                            this.props.users.data[0].online === 1 && <BadgeOnlineStatus height={15} width={15} color="lightgreen" />
                          }
                          <Text style={profile.name}>{this.props.users.data[0].full_name}</Text>
                        </View>
                        <Text style={profile.email}>
                          <FontAwesomeIcon icon={faEnvelope} />
                          {this.props.users.data[0].email}
                        </Text>
                        <Text style={profile.location}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                          {
                            this.props.location.isLoading
                              ? <Text>Loading...</Text>
                              : this.props.location.data
                                ? this.props.location.data.display_name
                                : <Text
                                  onPress={() => this.getAddress()}
                                >Cannot get location. Touch to refresh.</Text>
                          }
                        </Text>
                      </>
                    )
                    : <Text>An error occured</Text>
                  : <Text>An error occured</Text>
            }

          </View>
          {/* setting */}
          <View style={profile.lists}>
          </View>
        </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  location: state.location
})

const mapDispatchToProps = {
  logout,
  getDetailUser,
  getAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
