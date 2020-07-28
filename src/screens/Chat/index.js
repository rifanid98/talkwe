import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles as global, chatStyles as chat } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisH, faArrowLeft, faCheckDouble, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { ScrollView  } from 'react-native-gesture-handler';

class Chat extends Component {
  render() {
    return (
      <>
        <View style={[chat.container, global.relative]}>
          {/* header */}
          <View style={chat.header}>
            <Text style={chat.menuButton}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
            <TouchableOpacity
              style={chat.friend}
              onPress={() => this.props.navigation.navigate('profile')}
            >
              <Image
                style={chat.friendImage}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              />
              <View style={chat.friendInfo}>
                <Text style={chat.friendName}>Anne</Text>
                <Text style={chat.friendStatus}>Active Now</Text>
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
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(data => {
                if (data % 2 === 0) {
                  return (
                    <View
                      key={data}
                      style={chat.sender}>
                      <Image
                        style={chat.senderImage}
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                      />
                      <View style={chat.senderMessage}>
                        <Text style={chat.senderText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eius quo vel delectus totam iste, iure soluta eligendi ipsam consectetur hic volupta</Text>
                        <Text style={chat.timestamp}>20.35</Text>
                      </View>
                    </View>
                  )
                } else {
                  return (
                    <View
                      key={data}
                      style={chat.receiver}
                    >
                      <Text style={chat.receiverMessage}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eius quo vel delectus totam iste, iure soluta eligendi ipsam consectetur hic volupta</Text>
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
            />
            <Text style={chat.sendButton}>
                <FontAwesomeIcon style={chat.sendButtonIcon} icon={faPaperPlane} size={25}  />
            </Text>
          </View>
        </View>  
      </>
    )
  }
}

export default Chat;
