import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { globalStyles as global, chatStyles as chat } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH, faArrowLeft, faCheckDouble, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { getConversationsMessage, addMessage, setMessageStatus } from 'modules';
import { createFormData, convertDate } from 'utils';
import io from 'socket.io-client';
import { appConfig } from 'configs';
import { BadgeOnlineStatus } from 'components';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMount: false,
      messages: [],
      message: '',
      unreadMessages: [],
    }
  }

  /**
   * Life Cycles
   */
  componentDidMount() {
    this.getMessage()
    this.setMessageStatus()
    this._socketio()
  }
  componentWillUnmount() {
    this.socket.disconnect()
    this.socket.removeAllListeners()
  }
  componentDidUpdate() {
    
  }

  /**
   * Socket.IO Services
   */
  _socketio = () => {
    this.socket = io(appConfig.url.origin);
    this.socket.on('privateMessage', (data) => {
      this.setNewMessage(data)
    });
    this.socket.on('readMessage', (data) => {
      this.setReadMessage(data)
    });
  }

  /**
   * API Services
   */
  getUserInfo = () => {
    const token = this.props.auth.data.tokenLogin;
    const friendID = this.props.route.params.sender.id;
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
  getMessage = () => {
    const token = this.props.auth.data.tokenLogin;
    const senderID = this.props.route.params.sender.id
    const receiverID = this.props.auth.data.id
    token
      ? this.props.getConversationsMessage(token, senderID, receiverID)
        .then((res) => {
          this.setState({
            ...this.state,
            messages: this.props.messages.data.reverse()
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : console.log(`cannot find token`)
  }
  getNewMessage = () => {
    const token = this.props.auth.data.tokenLogin;
    const senderID = this.props.route.params.sender.id
    const receiverID = this.props.auth.data.id
    token
      ? this.props.getConversationsMessage(token, senderID, receiverID)
        .then((res) => {
          this.setState({
            ...this.state,
            messages: this.props.messages.data
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : console.log(`cannot find token`)
  }
  sendMessage = () => {
    const token = this.props.auth.data.tokenLogin;
    const senderID = this.props.auth.data.id;
    const receiverID = this.props.route.params.sender.id;
    const message = this.state.message;
    const data = {
      sender_id: senderID,
      receiver_id: receiverID,
      message: message
    }
    this.handleOnChange('', 'message')
    const formData = createFormData(data);
    token
      ? this.props.addMessage(token, formData)
        .then((res) => {
          
        }).catch((error) => {
          this.handleOnChange(message, 'message')
          Alert.alert('Send message failed', 'Please try again later.')
        })
      : console.log(`cannot find token`)
  }
  setMessageStatus = () => {
    const token = this.props.auth.data.tokenLogin;
    // friend
    const senderID = this.props.route.params.sender.id; 
    // user login
    const receiverID = this.props.auth.data.id;
    token
      ? this.props.setMessageStatus(token, senderID, receiverID)
        .then((res) => {

        }).catch((error) => {
          console.log(`set message status failed`)
        })
      : console.log(`cannot find token`)
  }
  

  /**
   * Logic
   */
  handleOnChange = (text, state) => {
    this.setState({
      ...this.state,
      [state]: text
    })
  }
  setNewMessage = (data) => {
    const senderID = this.props.auth.data.id;
    const receiverID = this.props.route.params.sender.id;
    if (data.receiver_id === senderID && data.sender_id === receiverID) {
      let messages = this.state.messages;
      messages.reverse()
      messages.push(data.message)
      this.setState({
        ...this.state,
        'messages': messages.reverse()
      }, () => {
        this.setMessageStatus()
      })
    }
    if (data.receiver_id === receiverID && data.sender_id === senderID) {
      let messages = this.state.messages;
      messages.reverse()
      messages.push(data.message)
      this.setState({
        ...this.state,
        'messages': messages.reverse()
      })
    }
  }
  setReadMessage = (data) => {
    const me = this.props.auth.data.id;
    const myFriend = this.props.route.params.sender.id;
    if (parseInt(data.sender_id) === parseInt(me) && parseInt(data.receiver_id) === parseInt(myFriend)) {
      let messages = this.state.messages;
      messages.map((message, index) => {
        if (message.message_read === 0) {
          message.message_read = 1;
        }
      })
      this.setState({
        ...this.state,
        messages: messages
      })
    }
  }

  /**
   * Emitter to deleteUnreadMessages HomeScreen
   */
// this.socket.emit('deleteUnreadMessages', {
//   sender_id: 1,
//   receiver_id: 2
// });

  /**
   * DOM Render
   */
  render() {
    const renderItem = (item) => {
      const message = item.item
      return (
        message.sender_id !== this.props.auth.data.id
        ? (
          <View
            key={message.id}
            style={chat.sender}>
            <Image
              style={chat.senderImage}
              source={{ uri: this.props.route.params.sender.image }}
            />
            <View style={chat.senderMessage}>
              <Text style={chat.senderText}>{message.message}</Text>
                <Text style={chat.timestamp}>{convertDate(message.created_at, 'timeDate24')}</Text>
            </View>
          </View>
        )
        : (
          <View
            key={message.id}
            style={chat.receiver}
          >
            <Text style={chat.receiverMessage}>{message.message}</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
                <Text style={chat.timestamp}>{convertDate(message.created_at, 'timeDate24')}</Text>
              <Text style={chat.checked}><FontAwesomeIcon icon={faCheckDouble} size={13} color={message.message_read === 0 ? `grey` : `lightblue`} /></Text>
            </View>
          </View>
        )
      )
    };
    return (
      <>
        <View style={[chat.container, global.relative]}>
          {/* header */}
          <View style={chat.header}>
            <Text
              style={chat.menuButton}
              onPress={() => this.props.navigation.goBack()}
            > <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
            <TouchableOpacity
              style={chat.friend}
              onPress={() => this.props.navigation.navigate('friendProfile', {senderID: this.props.route.params.sender.id})}
            >
              <Image
                style={chat.friendImage}
                source={{ uri: this.props.route.params.sender.image }}
              />
              <View style={chat.friendInfo}>
                <Text style={chat.friendName}>{this.props.route.params.sender.full_name}</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}>
                  {this.props.users.data
                    ? this.props.users.data.length > 0 
                      ? this.props.users.data[0].online === 1
                        ? <BadgeOnlineStatus height={10} width={10} color="lightgreen"/>
                        : <BadgeOnlineStatus height={10} width={10} color="lightgrey" />
                      : <BadgeOnlineStatus height={10} width={10} color="lightgrey" />
                    : <View style={{
                      height: 10,
                      width: 10,
                      backgroundColor: 'lightgrey',
                      borderRadius: 100,
                      marginRight: 5
                    }}></View>}
                  <Text style={chat.friendStatus}>
                    {this.props.users.data
                      ? this.props.users.data.length > 0
                        ? this.props.users.data[0].online === 1
                          ? 'Active'
                          : 'Offline'
                        : 'Offline'
                      : 'Offline'}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <Text style={chat.menuButton}> <FontAwesomeIcon icon={faEllipsisH} size={20} /> </Text> */}
          </View>
          {/* content */}
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            inverted
            data={this.state.messages}
            extraData={this.state.messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {/* footer */}
          <View style={chat.footer}>
            <TextInput
              style={chat.input}
              placeholder={this.props.messages.isSending ? 'Sending...' : 'Type a message...'}
              multiline={true}
              onChangeText={(text) => this.handleOnChange(text, 'message')}
              value={this.state.message}
            />
            <Text
              style={chat.sendButton}
              onPress={() => this.state.message.length > 0 && this.sendMessage()}
            >
              <FontAwesomeIcon style={chat.sendButtonIcon} icon={faPaperPlane} size={25} />
            </Text>
          </View>
        </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages,
  users: state.users,
})

const mapDispatchToProps = {
  getConversationsMessage,
  addMessage,
  setMessageStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
