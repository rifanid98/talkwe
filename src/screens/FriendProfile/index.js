import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { globalStyles as global, profileStyles as profile } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { logout, getDetailUser } from 'modules';

class FriendProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
   this.getUserInfo()
 }
  getUserInfo = () => {
    const token = this.props.auth.data.tokenLogin;
    const friendID = this.props.route.params.senderID;
    this.props.getDetailUser(token, friendID)
      .then(res => {
        
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
  render() {
    return (
      <>
        <View style={[profile.container, global.relative]}>
          {/* header */}
          <View style={profile.header}>
            <Text style={profile.menuButton} onPress={() => this.props.navigation.goBack()}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
          </View>
          {/* profile */}
          <View style={profile.profile}>
            {
              this.props.users.isLoading
                ? <Text>Loading</Text>
                : (
                  <>
                    <Image
                      style={profile.image}
                      source={{ uri: this.props.users.data[0].image }}
                    />
                    <Text style={profile.name}>{this.props.users.data[0].full_name}</Text>
                    <Text style={profile.email}>
                      <FontAwesomeIcon icon={faEnvelope} />
                      {this.props.users.data[0].email}
                    </Text>
                    <Text style={profile.location}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {this.props.users.data[0].location}
                    </Text>
                  </>
                )
            }
            
          </View>
          {/* setting */}
          <View style={profile.lists}>
          </View>
         </View>  
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users
})

const mapDispatchToProps = {
  logout,
  getDetailUser
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendProfile);
