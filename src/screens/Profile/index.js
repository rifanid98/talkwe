import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { globalStyles as global, profileStyles as profile } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faUserCircle, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { logout, patchUser, getAddress } from 'modules';
import { LoadingButton, FlashMessage, LoadingIcon } from 'components';
import { profileSchema, createFormData, createImageFormData } from 'utils';
import ImagePicker from 'react-native-image-picker'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      error: '',
      form: {
        username: this.props.auth.data.username,
        full_name: this.props.auth.data.full_name,
        email: this.props.auth.data.email,
        password: ''
      },
      image: null,
      onlineStatus: true
    }
  }

  /**
   * Life Cycles
   */
  componentDidMount() {
    this.getAddress()
    this._subscribe()
  }

  /**
   * NetInfo API
   */
  _subscribe = () => {
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      state.isConnected
        ? this.updateOnlineStatus(true)
        : this.updateOnlineStatus(false)
    });
  }

  /**
   * API Serives
   */
  updateUser = async () => {
    const data = {
      ...this.state.form
    }
    if (data.password.length < 1 || data.password === undefined) delete data.password
    if (data.username === this.props.auth.data.username) delete data.username

    if (Object.keys(data).length < 1) return;
    try {
      await profileSchema.validateAsync(data)
      this.setState({
        ...this.state,
        error: ''
      }, () => {
        const token = this.props.auth.data.tokenLogin;
        const userID = this.props.auth.data.id;
        const formData = createFormData(data)
        this.props.patchUser(token, formData, userID)
          .then(res => {
            Alert.alert(
              'Update Profile Success',
              'Please relogin to continue',
              [{ text: "Cancel", onPress: () => this.logout(), style: "cancel" },
              { text: "OK", onPress: () => this.logout() }], { cancelable: false }
            );
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
            Alert.alert('Update Profile Failed', errorMessage)
          });
      })
    } catch (error) {
      if (error) {
        this.setState({
          ...this.state,
          error: error.toString().replace('ValidationError:', '')
        })
      }
    }
  }
  updateUserImage = async () => {
    const token = this.props.auth.data.tokenLogin;
    const userID = this.props.auth.data.id;
    const image = this.state.image;
    const formData = createImageFormData(null, image, 'image')
    this.props.patchUser(token, formData, userID)
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
        Alert.alert('Update Image Failed', errorMessage)
      });
  }
  getAddress = () => {
    if (this.state.onlineStatus) {
      const latlang = this.props.auth.data.location;
      this.props.getAddress(latlang)
        .then(res => {

        })
        .catch(error => {
          console.log(error)
        })
    }
    
  }
  
   /**
    * Logics
    */
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
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({
          ...this.state,
          image: response
        }, () => {
            this.updateUserImage()
        })
      }
    })
  }
  logout = () => {
    this.props.logout()
  }
  updateOnlineStatus = (onlineStatus) => {
    this.setState({
      ...this.state,
      onlineStatus: onlineStatus
    })
  }

  /**
   * DOM Render
   */
  render() {
    return (
      <>
        <View style={[profile.container, global.relative]}>
          {this.state.error.length > 0 && <FlashMessage message={this.state.error} />}
          {/* header */}
          <View style={profile.header}>
            <Text style={profile.menuButton} onPress={() => this.props.navigation.goBack()}> <FontAwesomeIcon icon={faArrowLeft} size={20} /> </Text>
          </View>
          {/* profile */}
          <View
            style={profile.profile}
          >
            {
              this.props.users.isLoading
                ? <View style={[profile.image, {
                  backgroundColor: 'gray',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }]}>
                  <LoadingIcon style={{height: 50, width: 50}}/>
                </View>
                : this.state.image
                  ? <TouchableOpacity
                      onPress={() => this.handleChoosePhoto()}
                    >
                      <Image source={{ uri: this.state.image.uri }} style={profile.image} resizeMethod="resize" />
                    </TouchableOpacity>
                  : <TouchableOpacity
                      onPress={() => this.handleChoosePhoto()}
                    >
                      <Image style={profile.image} source={{ uri: this.props.auth.data.image }} resizeMethod="resize" />
                    </TouchableOpacity>
            }
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {this.state.onlineStatus
                ? <View style={{
                  height: 12,
                  width: 12,
                  backgroundColor: 'lightgreen',
                  borderRadius: 100,
                  marginRight: 10,
                }}></View>
                : <View style={{
                  height: 12,
                  width: 12,
                  backgroundColor: 'lightgrey',
                  borderRadius: 100,
                  marginRight: 10,
                }}></View>}
              <Text style={profile.name}>{this.props.auth.data.full_name}</Text>
            </View>
            <Text style={profile.email}>
              <FontAwesomeIcon icon={faEnvelope} />
              {this.props.auth.data.email}
            </Text>
            <Text style={profile.location}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              {
                this.props.location.isLoading
                  ? <Text>Loading...</Text> 
                  : this.props.location.data
                    ? this.props.location.data.display_name
                    : <Text
                      onPress={() => this.getAddress()}
                    >Cannot get location. Touch to refresh.</Text>
              }
            </Text>
          </View>
          {/* setting */}
          <View style={profile.lists}>
            {/* profile setting */}
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
            {/* Logout */}
            <TouchableOpacity
              style={profile.item}
              onPress={() => this.logout()}
            >
              <Text style={profile.itemIcon}>
                {
                  this.props.auth.isLoading
                    ? <LoadingIcon />
                    : <FontAwesomeIcon icon={faSignOutAlt} size={20} />
                }
              </Text>
              <View style={profile.itemContent}>
                <Text style={profile.itemName}>Logout</Text>
                <Text style={profile.itemInfo}>End your session</Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.edit && <View style={profile.form}>
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'username')}
              placeholder="Username"
              onChangeText={(text) => this.handleOnChange(text, {form: 'username'})}
              defaultValue={this.props.auth.data.username}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'full_name')}
              placeholder="Full Name"
              onChangeText={(text) => this.handleOnChange(text, {form: 'full_name'})}
              defaultValue={this.props.auth.data.full_name}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'email')}
              placeholder="Email"
              onChangeText={(text) => this.handleOnChange(text, {form: 'email'})}
              defaultValue={this.props.auth.data.email}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'password')}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => this.handleOnChange(text, {form: 'password'})}
            />
            {/* <LoadingButton /> */}
            <Text
              style={profile.button}
              onPress={() => this.updateUser()}
            >
              Save
            </Text>
          </View>}
         </View>  
      </>
    )
  }
  
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  location: state.location
})

const mapDispatchToProps = {
  logout,
  patchUser,
  getAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
