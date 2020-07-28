import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles as global, profileStyles as profile } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
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
            <Image
              style={profile.image}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <Text style={profile.name}>Admin Ganteng</Text>
            <Text style={profile.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              Bogor, Jawa Barat
            </Text>
          </View>
          {/* setting */}
          <View style={profile.lists}>
            <TouchableOpacity
              style={profile.item}
              onPress={() => this.setState({...this.state, edit: !this.state.edit}) }
            >
              <Text style={profile.itemIcon}>
                <FontAwesomeIcon icon={faUserCircle} size={20} />
              </Text>
              <View style={profile.itemContent}>
                <Text style={profile.itemName}>Profile</Text>
                <Text style={profile.itemInfo}>Edit your profile</Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.edit && <View style={profile.form}>
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'username')}
              placeholder="Username"
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'full_name')}
              placeholder="Full Name"
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'email')}
              placeholder="Email"
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'password')}
              placeholder="Password"
              secureTextEntry={true}
            />
            {/* <LoadingButton /> */}
            <Text
              style={profile.button}
              onPress={() => this.handleSubmit()}
            >
              Save
            </Text>
          </View>}
         </View>  
      </>
    )
  }
}

export default Profile;
