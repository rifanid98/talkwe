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

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.socket = io(appConfig.url.origin);
    this.socket.on('privateMessage', (data) => {
      this.setNewMessage(data)
    });
  }
  componentWillUnmount() {
    this.socket.disconnect()
    this.socket.removeAllListeners()
  }
  componentDidUpdate() {
    
  }

  /**
   * API Services
   */
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
          // this.getMessage()
        }).catch((error) => {
          this.handleOnChange(message, 'message')
          Alert.alert('Send message failed', 'Please try again later.')
        })
      : console.log(`cannot find token`)
  }
  setMessageStatus = () => {
    const token = this.props.auth.data.tokenLogin;
    const senderID = this.props.route.params.sender.id; 
    const receiverID = this.props.auth.data.id;
    token
      ? this.props.setMessageStatus(token, senderID, receiverID)
        .then((res) => {
          // console.log(res)
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
                <Text style={chat.friendStatus}>{this.props.route.params.sender.online === 0 ? 'Offline' : 'Active Now'}</Text>
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
})

const mapDispatchToProps = {
  getConversationsMessage,
  addMessage,
  setMessageStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
