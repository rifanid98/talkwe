import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, Platform, PermissionsAndroid, AppState } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { globalStyles as global, homeStyles as home, colorScheme as color} from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt, faUserCircle, faCommentDots, faUserFriends, faBell } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
  getFriendsList,
  getMessagesList,
  getMessageStatus,
  patchUser,
  setLocation,
  getFriendsRequest,
  getNewNotification,
  addNotification
} from 'modules';
import io from 'socket.io-client';
import { appConfig } from 'configs';
import { convertDate, createFormData } from 'utils';
import Geolocation from 'react-native-geolocation-service';
import { BadgeNotification, BadgeOnlineStatus } from 'components';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      },
      friendsList: [],
      friendsRequest: [],
      messagesList: [],
      unreadMessages: [],
      usersOnline: []
    }
  }

  /**
   * Life Cycles
   */
  async componentDidMount() {
    this.getMessagesList()
    this.getFriendsList()
    this.getMessageStatus()
    this.getFriendsRequest()
    this.getNewNotification()
    this._socketio()
    this._subscribe()
    await this.requestPermissions()
    this.setLocation()
    AppState.addEventListener(
      'change',
      this._handleAppStateChange
    );
  }
  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket.removeAllListeners()
    }
    AppState.removeEventListener(
      'change',
      this._handleAppStateChange
    );
  }

  /**
   * Socket.IO Services
   */
  _socketio = () => {
    this.socket = io(appConfig.url.origin);
    this.socket.on('privateMessage', (data) => {
      data.sender_id === this.props.auth.data.id && this.getMessagesList()
      data.receiver_id === this.props.auth.data.id && this.setUnreadMessages(data)
    });
    this.socket.on('notifications', (data) => {
      data.receiver_id === this.props.auth.data.id && this.addNotification(data)
      if (data.message.search('accepted')) {
        this.getFriendsRequest()
        this.getFriendsList()
      }
      if (data.sender_id === this.props.auth.data.id) {
        this.getFriendsRequest()
        this.getFriendsList()
      }
    });
    this.socket.on('refresh', () => {
      this.getMessagesList()
      this.getFriendsList()
      this.getMessageStatus()
      this.getFriendsRequest()
      this.getNewNotification()
    });
  }

  /**
   * NetInfo API
   */
  _subscribe = () => {
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      state.isConnected
        ? this.updateOnlineStatus(1)
        : this.updateOnlineStatus(0)
    });
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
  getFriendsRequest = () => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    token
      ? this.props.getFriendsRequest(token, id)
        .then((res) => {
          const friendsRequest = res.value.data.data;
          this.setState({
            ...this.state,
            friendsRequest: friendsRequest
          })
        }).catch((error) => {
          console.log(error, `get friends lists failed`)
        })
      : console.log(`cannot find token`)
  }
  getMessagesList = () => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    token
      ? this.props.getMessagesList(token, id)
        .then((res) => {
          this.setState({
            ...this.state,
            messagesList: this.props.messages.data
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : console.log(`cannot find token`)
  }
  getMessageStatus = () => {
    const token = this.props.auth.data.tokenLogin;
    const receiverID = this.props.auth.data.id;
    token
    ? this.props.getMessageStatus(token, receiverID)
        .then((res) => {
          this.setState({
            ...this.state,
            unreadMessages: res.value.data.data
          })
        }).catch((error) => {
          console.log(`get message status failed`)
        })
      : console.log(`cannot find token`)
  }
  updateUser = (data) => {
    const token = this.props.auth.data.tokenLogin;
    const user_id = this.props.auth.data.id;
    const formData = createFormData(data)
    this.props.patchUser(token, formData, user_id)
      .then((res) => {
        console.log('Location updated');
      })
      .catch((error) => {
        console.log(error);
        error.response.data.message
          ? Alert.alert('Failed', error.response.data.message)
          : Alert.alert('Failed', 'Update Location Failed.')
      })
  }
  updateOnlineStatus = (onlineStatus) => {
    const token = this.props.auth.data.tokenLogin;
    const user_id = this.props.auth.data.id;
    const data = {
      online: onlineStatus
    }
    const formData = createFormData(data)
    this.props.patchUser(token, formData, user_id)
      .then((res) => {
        this.socket.emit('refresh', {});
      })
      .catch((error) => {
        console.log(error);
        error.response.data.message
          ? Alert.alert('Failed', error.response.data.message)
          : Alert.alert('Failed', 'Update Location Failed.')
      })
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
  setLocation = () => {
    setTimeout(() => {
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
            this.props.setLocation(this.state.location)
            this.updateUser({ location: `${this.state.location.latitude},${this.state.location.longitude}` })
          })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }, 1000);
    setInterval(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          if (this.state.location.latitude !== position.coords.latitude && this.state.location.longitude !== position.coords.longitude) {
            this.setState({
              ...this.state,
              location: {
                ...this.state.location,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            }, () => {
              this.props.setLocation(this.state.location)
              this.updateUser({ location: `${this.state.location.latitude},${this.state.location.longitude}` })
            })
          }
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }, 1000 * 60 * 30); //every 30mins
  };
 
  /**
   * Logics
   */
  goToChat = (data) => {
    this.deleteUnreadMessages(data.id)
    this.props.navigation.navigate('chat', { sender: data })
  }
  getUnreadMessages = (senderID) => {
    const unreadMessages = this.state.unreadMessages;
    let count = 0;
    unreadMessages.map(unreadMessage => {
      if (unreadMessage.sender_id === senderID) count += unreadMessage.total
    })
    return count;
  }
  deleteUnreadMessages = (senderID) => {
    let unreadMessages = this.state.unreadMessages;
    unreadMessages.map((unreadMessage, index) => {
      if (unreadMessages[index].sender_id === senderID) {
        if (unreadMessages.length < 2) {
          unreadMessages = [];
        } else {
          delete unreadMessages[index];
        }
      }
      this.setState({
        ...this.state,
        'unreadMessages': unreadMessages
      })
    })
  }
  setUnreadMessages = async (data) => {
    const unreadMessages = this.state.unreadMessages;
    // if (data.receiver_id === this.props.auth.data.id) {
      let count = 0;
      let newIndex = 0;
      await unreadMessages.map((unreadMessage, index) => {
        if (unreadMessage.sender_id === data.sender_id) {
          count++;
          newIndex = index;
        }
      })
      if (count !== 0 && count !== undefined && count !== null) {
        unreadMessages[newIndex].total += 1;
      } else {
        unreadMessages.push({
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          total: 1
        })
      }
      this.setState({
        ...this.state, 
        'unreadMessages': unreadMessages
      })
      this.getMessagesList()
      // this.getNewMessagesList()
    // }
  }
  getNewNotification = () => {
    const id = this.props.auth.data.id;
    this.props.getNewNotification(id)
  }
  addNotification = (data) => {
    const id = this.props.auth.data.id;
    console.log(id)
    if (id === null) return;
    const notifData = {
      user_id: id,
      message: data.message,
      read: 0
    }
    this.props.addNotification(notifData) 
    this.getNewNotification()
    this.getFriendsList()
    this.setState({
      ...this.state,
      friendsRequest: data.data
    })
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      this.updateOnlineStatus(0)
    } else {
      this.updateOnlineStatus(1)
    }
  };


  /**
   * DOM Render
   */
  render() {
    return (
      <>
        <View style={[home.container, global.relative]}>
          {/* header */}
          <View style={home.header}>
            <Text style={home.title}>Messages</Text>
            <View style={home.menu}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('maps')}
              >
                <Text
                  style={home.menuIcon}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkedAlt}
                    size={20} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  home.menuIcon,
                  global.relative, 
                  {
                    justifyContent: 'center',
                    alignItems: 'center'
                  }]}
                onPress={() => this.props.navigation.navigate('friendsRequest', {
                  friendsRequest: this.state.friendsRequest
                })}
              >
                <Text>
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    size={20} />
                </Text>
                {this.state.friendsRequest
                  && this.state.friendsRequest.length > 0
                  && <BadgeNotification />}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  home.menuIcon,
                  global.relative,
                  {
                    justifyContent: 'center',
                    alignItems: 'center'
                  }]}
                onPress={() => this.props.navigation.navigate('notifications')}
              >
                <Text>
                  <FontAwesomeIcon
                    icon={faBell}
                    size={20} />
                </Text>
                {this.props.notifications.getNewNotifications.length > 0 && <BadgeNotification />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('profile')}
              >
                <Text
                  style={home.menuIcon}
                  >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size={20} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* friends list */}
          <View style={home.friendsList}>
            <Text style={home.label}>Friends List</Text>
            <ScrollView
              style={home.friendsListItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 25
              }}
            >
              {
                (this.state.friendsList && this.state.friendsList.length > 0)
                && this.state.friendsList.map((friend, index) => {
                  if (friend.online === 1) {
                    return (
                      <View
                        key={index}
                        style={[home.friendsListItem, global.relative]}>
                        <Image
                          style={home.friendsListItemImage}
                          source={{ uri: friend.image }}
                        />
                        <Text style={home.friendsListItemName}>{friend.full_name.split(' ')[0]}</Text>
                        <BadgeOnlineStatus
                          height={15}
                          width={15}
                          color="lightgreen"
                          style={{
                            position: 'absolute',
                            bottom: 30,
                            right: 0
                          }}
                          />
                      </View>
                    )
                    } else {
                      return (
                        <View
                          key={index}
                          style={home.friendsListItem}>
                          <Image
                            key={index}
                            style={home.friendsListItemImage}
                            source={{ uri: friend.image }}
                          />
                          <Text style={home.friendsListItemName}>{friend.full_name.split(' ')[0]}</Text>
                        </View>
                      )
                    }
                  }) 
              }
            </ScrollView>
          </View>
          {/* messages */}
          <View style={home.messagesList}>
            <View style={home.labelWrapper}>
              <Text style={home.label}>Messages List</Text>
              {
                this.state.unreadMessages.length > 0
                && <Text style={[home.messagesListItemInfoCircle, home.labelBadge]}>{this.state.unreadMessages.length}</Text> 
              }
            </View>
            <ScrollView
              style={home.messagesListItems}
            >
              {
                (this.state.messagesList && this.state.messagesList.length > 0)
                && this.state.messagesList.map((message, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={home.messagesListItem}
                      onPress={() => this.goToChat({
                          id: message.sender_id === this.props.auth.data.id ? message.receiver_id : message.sender_id,
                          full_name: message.full_name,
                          image: message.image,
                          online: message.online
                        })}
                    >
                      <Image
                        style={home.messagesListItemImage}
                        source={{ uri: message.image }}
                      />
                      <View style={home.messagesListItemContent}>
                        <Text style={home.messagesListItemContentTitle}>{message.full_name.split(' ')[0]}</Text>
                        <Text style={home.messagesListItemContentText}>{message.message}</Text>
                      </View>
                      <View style={home.messagesListItemInfo}>
                        <Text style={home.messagesListItemInfoTitle}>{convertDate(message.created_at, 'timeOnly24')}</Text>
                        {this.getUnreadMessages(message.sender_id) > 0 && <Text style={home.messagesListItemInfoCircle}>{this.getUnreadMessages(message.sender_id)}</Text>}
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          <Text 
            style={home.addMessageButton}
            onPress={() => this.props.navigation.navigate('addChat')}
          >
            <FontAwesomeIcon
              color={color.accent}
              icon={faCommentDots}
              size={50}
            />
          </Text>
        </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends,
  messages: state.messages,
  location: state.location,
  notifications: state.notifications
})

const mapDispatchToProps = {
  getFriendsList,
  getMessagesList,
  getMessageStatus,
  setLocation,
  patchUser,
  getFriendsRequest,
  getNewNotification,
  addNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
