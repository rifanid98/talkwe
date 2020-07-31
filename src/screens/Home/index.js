import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TouchableOpacityBase, Alert } from 'react-native';
import { globalStyles as global, homeStyles as home, colorScheme as color} from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt, faUser, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getFriendsList, getMessagesList, getMessageStatus, patchUser, setLocation } from 'modules';
import io from 'socket.io-client';
import { appConfig } from 'configs';
import { convertDate, getPassedTime, createFormData } from 'utils';
import Geolocation from 'react-native-geolocation-service';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        latitude: 0,
        longitude: 0,
      },
      friendsList: [],
      messagesList: [],
      unreadMessages: [],
    }
  }

  /**
   * Life Cycles
   */
  componentDidMount() {
    this.getMessagesList()
    this.getFriendsList()
    this.getMessageStatus()
    this.socket = io(appConfig.url.origin);
    // this.socket.on('deleteUnreadMessages', (data) => {
    //   console.log(data)
    //   this.deleteUnreadMessages(senderID)
    // });
    this.socket.on('privateMessage', (data) => {
      if (data.sender_id === this.props.auth.data.id) {
        this.getMessagesList()
      }
    });
    this.socket.on('broadcastMessage', (data) => {
      this.setUnreadMessages(data)
    });
    setTimeout(() => {
      this.setLocation()
    }, 1000);
    setTimeout(() => {
    }, 2000);
  }
  componentWillUnmount() {
    this.socket.disconnect()
    this.socket.removeAllListeners()
  }
  componentDidUpdate() {
    console.log(this.props.messages, 'messages');
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
  /**
   * Logic
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
    console.log(unreadMessages, 'unreadMessage');
    unreadMessages.map((unreadMessage, index) => {
      console.log(unreadMessages[index].sender_id, 'sender id');
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
    if (data.receiver_id === this.props.auth.data.id) {
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
    }
  }
  setLocation = () => {
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
            this.updateUser({ location: `${this.state.location.latitude},${this.state.location.longitude}`})
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
      <>
        <View style={[home.container, global.relative]}>
          {/* header */}
          <View style={home.header}>
            <Text style={home.title}>Messages</Text>
            <View style={home.menu}>
              <Text style={home.menuIcon} onPress={() => this.props.navigation.navigate('maps')}> <FontAwesomeIcon icon={faMapMarkedAlt} size={20} /> </Text>
              <Text style={home.menuIcon} onPress={() => this.props.navigation.navigate('profile')}> <FontAwesomeIcon icon={faUser} size={20} /> </Text>
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
                    return (
                      <View style={home.friendsListItem}>
                        <Image
                          key={index}
                          style={home.friendsListItemImage}
                          source={{ uri: friend.image }}
                        />
                        <Text style={home.friendsListItemName}>{friend.full_name.split(' ')[0]}</Text>
                      </View>
                    )
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
  location: state.location
})

const mapDispatchToProps = {
  getFriendsList,
  getMessagesList,
  getMessageStatus,
  setLocation,
  patchUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
