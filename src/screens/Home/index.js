import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { globalStyles as global, homeStyles as home } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarkedAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native-gesture-handler';

class Home extends Component {
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
                [1, 1, 1, 1, 1, 1, 1, 1].map((data, index) => {
                  return (
                    <View style={home.friendsListItem}>
                      <Image
                        key={index}
                        style={home.friendsListItemImage}
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                      />
                      <Text style={home.friendsListItemName}>Anne</Text>
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
              // showsVerticalScrollIndicator={false}
            >
              {
                [1, 1, 1, 1, 1, 1, 1, 1].map((data, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={home.messagesListItem}
                      onPress={() => this.props.navigation.navigate('chat')}
                    >
                      <Image
                        style={home.messagesListItemImage}
                        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                      />
                      <View style={home.messagesListItemContent}>
                        <Text style={home.messagesListItemContentTitle}>Anne</Text>
                        <Text style={home.messagesListItemContentText}>Lorem ipsum dolor sit .</Text>
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

export default Home;
