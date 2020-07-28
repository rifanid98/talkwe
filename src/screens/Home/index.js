import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { globalStyles as global, homeStyles as home } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {  getFriendsList, getMessagesList } from 'modules';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendsList: [],
      messagesList: [],
    }
  }

  componentDidMount() {
    this.getFriendsList()
    this.getMessagesList()
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
      : alert('Token Failed', 'Cannot find token...')
  }
  getMessagesList = () => {
    const token = this.props.auth.data.tokenLogin;
    const id = this.props.auth.data.id
    token
      ? this.props.getMessagesList(token, id)
        .then((res) => {
          console.log(this.props.messages, 'props messages')
          this.setState({
            ...this.state,
            messagesList: this.props.messages.data
          }, () => {
            console.log(this.state.messagesList);
          })
        }).catch((error) => {
          console.log(`get messages lists failed`)
        })
      : alert('Token Failed', 'Cannot find token...')
  }
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
            <Text style={home.label}>Messages List</Text>
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
                      onPress={() => this.props.navigation.navigate('chat', {
                        sender: {
                          id: message.sender_id,
                          full_name: message.full_name,
                          image: message.image,
                          online: message.online
                        }
                      })}
                    >
                      <Image
                        style={home.messagesListItemImage}
                        source={{ uri: message.image }}
                      />
                      <View style={home.messagesListItemContent}>
                        <Text style={home.messagesListItemContentTitle}>{message.username}</Text>
                        <Text style={home.messagesListItemContentText}>{message.message}</Text>
                      </View>
                      <View style={home.messagesListItemInfo}>
                        <Text style={home.messagesListItemInfoTitle}>12min</Text>
                        <Text style={home.messagesListItemInfoCircle}>2</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends,
  messages: state.messages,
})

const mapDispatchToProps = {
  getFriendsList,
  getMessagesList,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
