import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles as global, chatStyles as chat } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH, faArrowLeft, faCheckDouble, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ScrollView  } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getConversationsMessage, addMessage } from 'modules';
import { createFormData } from 'utils';
import { LoadingIcon } from 'components';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message: ''
    }
  }
  componentDidMount() {
    this.getMessage()
  }
  handleOnChange = (text, state) => {
    this.setState({
      ...this.state,
      [state]: text
    })
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
            messages: this.props.messages.data
          }, () => {
              console.log(this.state.messages);
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : alert('Token Failed', 'Cannot find token...')
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
          }, () => {
            console.log(this.state.messages);
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : alert('Token Failed', 'Cannot find token...')
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
    const formData = createFormData(data);
    token
      ? this.props.addMessage(token, formData)
        .then((res) => {
          this.handleOnChange('', 'message')
          this.getMessage()
        }).catch((error) => {
          console.log(`send message failed`)
        })
      : alert('Token Failed', 'Cannot find token...')
  }
  render() {
    return (
      <>
        <View style={[chat.container, global.relative]}>
          {/* header */}
          <View style={chat.header}>
            <Text style={chat.menuButton}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
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
          <ScrollView
            style={chat.content}
            contentContainerStyle={{
              paddingBottom: 85
            }}
          >
            {
              this.state.messages.map(message => {
                if (message.sender_id !== this.props.auth.data.id) {
                  return (
                    <View
                      key={message.id}
                      style={chat.sender}>
                      <Image
                        style={chat.senderImage}
                        source={{ uri: this.props.route.params.sender.image }}
                      />
                      <View style={chat.senderMessage}>
                        <Text style={chat.senderText}>{message.message}</Text>
                        <Text style={chat.timestamp}>20.35</Text>
                      </View>
                    </View>
                  )
                } else {
                  return (
                    <View
                      key={message.id}
                      style={chat.receiver}
                    >
                      <Text style={chat.receiverMessage}>{message.message}</Text>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end'
                      }}>
                        <Text style={chat.timestamp}>20.35</Text>
                        <Text style={chat.checked}><FontAwesomeIcon icon={faCheckDouble} size={13} /></Text>
                      </View>
                    </View>
                  )
                }
              })
            }
          </ScrollView>
          {/* footer */}
          <View style={chat.footer}>
            <TextInput
              style={chat.input}
              placeholder="Type a message..."
              multiline={true}
              onChangeText={(text) => this.handleOnChange(text, 'message')}
              value={this.state.message}
            />
            <Text
              style={chat.sendButton}
              onPress={() => this.state.message.length > 0 && this.sendMessage()}
            >
              {
                this.props.messages.isLoading
                  ? <LoadingIcon />
                  : <FontAwesomeIcon style={chat.sendButtonIcon} icon={faPaperPlane} size={25} />
              }
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
  addMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
