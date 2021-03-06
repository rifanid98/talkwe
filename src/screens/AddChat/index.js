import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { globalStyles as global, chatStyles as chat } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getFriendsList } from 'modules';
import { BadgeOnlineStatus } from 'components';
import { appConfig } from 'configs';

class AddChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendsList: [],
      toggleSearch: false,
    }
  }

  /**
   * Life Cyvles
   */
  componentDidMount() {
    this.getFriendsList()
  }

  componentDidUpdate() {
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
          }, () => {
            console.log(this.state.friendsList, 'add chat')
          })
        }).catch((error) => {
          console.log(error, `get friends lists failed`)
        })
      : console.log(`cannot find token`)
  }

  /**
   * Logics
   */
  goToChat = (data) => {
    this.props.navigation.navigate('chat', { sender: data })
  }
  handleOnChange = (text, state) => {
    Object.keys(state).map(data => {
      this.setState({
        ...this.state,
        [data]: {
          ...this.state[data],
          [state[data]]: text
        }
      }, () => {
        console.log(this.state.form)
      })
    })
  }
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
              <Text style={chat.title}>Choose Friend</Text>
              <Text style={chat.small}>{this.state.friendsList.length} Friends</Text>
            </View>
            <Text
              style={chat.menuButton}
              onPress={() => this.setState({...this.state, toggleSearch: !this.state.toggleSearch})}
            > <FontAwesomeIcon icon={faSearch} size={20} /> </Text>
          </View>
          {
            this.state.toggleSearch && (
              <View style={chat.headerSearch}>
                <Text
                  style={chat.menuButton}
                  onPress={() => this.props.navigation.goBack()}
                > <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
                <TextInput
                  autoFocus={true}
                  style={chat.inputSearch}
                  onBlur={() => this.setState({ ...this.state, toggleSearch: !this.state.toggleSearch })}
                  placeholder="Search..."
                />
              </View>
            )
          }
          <ScrollView style={chat.contacts}>
            {
                (this.state.friendsList && this.state.friendsList !== undefined && this.state.friendsList.length > 0)
                ? this.state.friendsList.map(friend => {
                  return (
                    <TouchableOpacity
                      key={friend.id}
                      style={chat.contact}
                      onPress={() => this.goToChat({
                        id: friend.user_id2 === this.props.auth.data.id ? friend.user_id1 : friend.user_id2,
                        full_name: friend.full_name,
                        image: appConfig.url.assets + '/' + friend.image,
                        online: friend.online
                      })}
                    >
                      <View style={global.relative}>
                        <Image
                          style={chat.contactImage}
                          source={{ uri: appConfig.url.assets + '/' + friend.image }}
                          resizeMethod='resize'
                        />
                        {friend.online === 1
                          && <BadgeOnlineStatus
                          height={10}
                          width={10}
                          color="lightgreen" 
                          style={{
                            marginRight: 5,
                            position: 'absolute',
                            right: -5,
                            bottom: 0
                          }}
                          />}
                      </View>
                      <View style={chat.contactInfo}>
                        <Text style={chat.contactName}>{friend.full_name}</Text>
                        <Text style={chat.contactText}>My status is here!</Text>
                      </View>
                      {friend.online === 0 
                          ? <Text style={[chat.contactStatus, { color: 'grey' }]}>Offline</Text>
                          : <Text style={chat.contactStatus}>Active</Text>}

                    </TouchableOpacity>
                  )
                })
                  : <Text style={[chat.contactText, { flex: 1, textAlign: 'center' }]}>No friends yet</Text>
            }
          </ScrollView>
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
  getFriendsList,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChat);
