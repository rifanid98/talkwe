import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { globalStyles as global, chatStyles as chat, colorScheme as color } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCheckSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getNotifications, getNewNotification, readNotification, deleteNotification } from 'modules';

class Notifications extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * Life Cyvles
   */
  componentDidMount() {
    this.getNotifications()
  }
  componentDidUpdate() {
  }

  /**
   * Logics
   */
  getNotifications = () => {
    const id = this.props.auth.data.id;
    this.props.getNotifications(id)
  }
  getNewNotification = () => {
    const id = this.props.auth.data.id;
    this.props.getNewNotification(id)
  }
  readNotification = () => {
    const id = this.props.auth.data.id;
    this.props.readNotification(id)
    this.getNotifications()
    this.getNewNotification()
  }
  deleteNotification = () => {
    const id = this.props.auth.data.id;
    this.props.deleteNotification(id)
    this.readNotification()
    this.getNotifications()
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
              <Text style={chat.title}>Notifications</Text>
              <Text style={chat.small}>{this.props.notifications.getNotifications.length} Notifications</Text>
            </View>
            <Text
              style={chat.menuButton}
              onPress={() => this.readNotification()}
            > <FontAwesomeIcon icon={faCheckSquare} size={20} /> </Text>
            <Text
              style={chat.menuButton}
              onPress={() => this.deleteNotification()}
            > <FontAwesomeIcon icon={faTrash} size={20} /> </Text>
          </View>
          {/* content */}
          <ScrollView style={chat.contacts}>
            {
              this.props.notifications 
              && this.props.notifications.getNotifications
              && this.props.notifications.getNotifications.length > 0
              && this.props.notifications.getNotifications.reverse().map((notif, index) => {
                return (
                  <View key={index} style={chat.contact}>
                    <View style={chat.contactInfo}>
                      <Text style={[chat.contactText, { textTransform: 'none' }]}>{notif.read === 0 ? '+' : '-'} {notif.message}</Text>
                    </View>
                  </View>
                )
              })

            }
          </ScrollView>
         </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
})

const mapDispatchToProps = {
  getNotifications,
  readNotification,
  deleteNotification,
  getNewNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
