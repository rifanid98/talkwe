import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { globalStyles as global, chatStyles as chat, colorScheme as color } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { confirmFriendRequest, getFriendsRequest } from 'modules';
import { createUrlParamFromObj } from 'utils';
import io from 'socket.io-client';
import { LoadingIcon } from 'components';
import { appConfig } from 'configs';

class FriendsRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendsRequest: this.props.route.params.friendsRequest,
      toggleSearch: false,
    }
  }

  /**
   * Life Cyvles
   */
  componentDidMount() {
    this.socket = io(appConfig.url.origin);
    this.socket.on('notifications', (data) => {
      data.receiver_id === this.props.auth.data.id && this.addNotification(data)
      if (data.sender_id === this.props.auth.data.id) {
        this.getFriendsRequest()
      }
    });
  }

  componentDidUpdate() {
  }
  componentWillUnmount() {
    this.socket.disconnect()
    this.socket.removeAllListeners()
  }
  /**
   * API Services
   */
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
  confirmFriendRequest = (friendID) => {
    const token = this.props.auth.data.tokenLogin;
    const userID = this.props.auth.data.id;
    const action = 'confirm';
    token
      ? this.props.confirmFriendRequest(token, userID, friendID, action)
        .then((res) => {
          Alert.alert('Request Accepted', 'You have a new friend now :D.')
        }).catch((error) => {
          console.log(error, `get confirm friends request failed`)
          Alert.alert('Request Confirmation Failed', 'Please try again later.')
        })
      : console.log(`cannot find token`)
  }

  /**
   * Logics
   */
  render() {
    return (
      <>
        <View style={[chat.container, global.relative]}>
          {/* header */}
          <View style={chat.header}>
            <Text
              style={chat.menuButton}
              onPress={() => this.props.navigation.goBack()}
            > <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={chat.title}>Friends Request</Text>
              <Text style={chat.small}>{this.props.route.params.friendsRequest.length} Requests</Text>
            </View>
          </View>
          {/* content */}
          <ScrollView style={chat.contacts}>
            {
              (this.state.friendsRequest && this.state.friendsRequest !== undefined && this.state.friendsRequest.length > 0)
                ? this.state.friendsRequest.map(friend => {
                  return (
                    <TouchableOpacity
                      key={friend.id}
                      style={chat.contact}
                      onPress={() => this.goToChat({
                        id: friend.user_id2,
                        full_name: friend.full_name,
                        image: friend.image,
                        online: friend.online
                      })}
                    >
                      <Image
                        style={chat.contactImage}
                        source={{ uri: friend.image }}
                        resizeMethod='resize'
                      />
                      <View style={chat.contactInfo}>
                        <Text style={chat.contactName}>{friend.full_name}</Text>
                        <Text style={chat.contactText}>My status is here!</Text>
                      </View>
                      <Text style={[
                        chat.contactStatus,
                        {
                          backgroundColor: color.accent,
                          color: color.primary,
                          padding: 5,
                          borderRadius: 12
                        }
                      ]}
                      onPress={() => this.confirmFriendRequest(friend.id)}
                      >CONFIRM</Text>
                    </TouchableOpacity>
                  )
                })
                : <Text style={[chat.contactText, { flex: 1, textAlign: 'center' }]}>No friends request</Text>
            }
          </ScrollView>
          {
            this.props.friends.isLoading && <View style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1
            }}>
              <LoadingIcon type={2} style={{ height: 50, width: 50 }} />
              <Text>Loading...</Text>
            </View>
          }
         </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends,
})

const mapDispatchToProps = {
  confirmFriendRequest,
  getFriendsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsRequest);
