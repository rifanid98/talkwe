import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { globalStyles as global, profileStyles as profile } from 'assets';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt, faUserCircle, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { logout, patchUser, getAddress } from 'modules';
import { LoadingButton, FlashMessage, LoadingIcon, BadgeOnlineStatus } from 'components';
import { profileSchema, createFormData, createImageFormData } from 'utils';
import ImagePicker from 'react-native-image-picker';
import io from 'socket.io-client';
import { appConfig } from 'configs';

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
      isLocationLoading: false,
      isLogoutLoading: false,
      isImageLoading: false,
      locationShare: this.props.auth.data.location_share
    }
  }

  /**
   * Life Cycles
   */
  componentDidMount() {
    this.getAddress()
    this._socketio()
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
    this.setState({
      ...this.state,
      isImageLoading: true
    })
    const token = this.props.auth.data.tokenLogin;
    const userID = this.props.auth.data.id;
    const image = this.state.image;
    const formData = createImageFormData(null, image, 'image')
    this.props.patchUser(token, formData, userID)
      .then(res => {
        this.setState({
          ...this.state,
          isImageLoading: false
        })
      })
      .catch(error => {
        this.setState({
          ...this.state,
          isImageLoading: false
        })
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
  updateUserLocation = async () => {
    this.setState({
      ...this.state,
      isLocationLoading: true
    })
    const token = this.props.auth.data.tokenLogin;
    const userID = this.props.auth.data.id;
    const locationShare = this.state.locationShare === 0 ? 1 : 0 ;
    const obj = {
      location_share: locationShare
    }
    const formData = createFormData(obj)
    this.props.patchUser(token, formData, userID)
      .then(res => {
        this.setState({
          ...this.state,
          isLocationLoading: false,
          locationShare: locationShare
        })
      })
      .catch(error => {
        this.setState({
          ...this.state,
          isLocationLoading: false
        })
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
   * Socket.IO Services
   */
  _socketio = () => {
    this.socket = io(appConfig.url.origin);
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
        if (response.fileSize > 1024*1024*3) {
          Alert.alert('Image size is too large.', 'The maximum size is 3 MB. Please choose another image.')
        } else {
          this.setState({
            ...this.state,
            image: response
          }, () => {
              this.updateUserImage()
          })
        }
      }
    })
  }
  logout = () => {
    this.setState({
      ...this.state,
      isLogoutLoading: true
    })
    const token = this.props.auth.data.tokenLogin;
    const user_id = this.props.auth.data.id;
    const data = {
      online: 0
    }
    const formData = createFormData(data)
    this.props.patchUser(token, formData, user_id)
      .then((res) => {
        this.setState({
          ...this.state,
          isLogoutLoading: false
        }, () => {
            this.socket.emit('refresh', {});
            this.props.logout()
        })
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          isLogoutLoading: false
        })
        console.log(error);
        error.response.data.message
          ? Alert.alert('Failed', error.response.data.message)
          : Alert.alert('Failed', 'Update Location Failed.')
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}
            >
            {/* profile */}
            <View
              style={profile.profile}
            >
              {
                this.state.isImageLoading
                  ? <View style={[profile.image, {
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }]}>
                    <LoadingIcon style={{ height: 50, width: 50 }} />
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
                <BadgeOnlineStatus height={12} width={12} color="lightgreen" style={{ marginRight: 10 }} />
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
                onPress={() => this.setState({ ...this.state, edit: !this.state.edit })}
              >
                <Text style={profile.itemIcon}>
                  <FontAwesomeIcon icon={faUserCircle} size={20} />
                </Text>
                <View style={profile.itemContent}>
                  <Text style={profile.itemName}>Profile</Text>
                  <Text style={profile.itemInfo}>Edit your profile</Text>
                </View>
              </TouchableOpacity>
              {/* location setting */}
              <TouchableOpacity
                style={profile.item}
                onPress={() => this.updateUserLocation()}
              >
                {this.state.isLocationLoading
                  ? <LoadingIcon type={2} style={{ height: 30, width: 30 }} />
                  : <Text style={profile.itemIcon}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} size={20} />
                    </Text>}
                
                <View style={profile.itemContent}>
                  {
                    this.state.locationShare === 1
                      ? <>
                          <Text style={profile.itemName}>Location On</Text>
                          <Text style={profile.itemInfo}>Other users can see your location</Text>
                        </>
                      : <>
                          <Text style={profile.itemName}>Location Off</Text>
                          <Text style={profile.itemInfo}>Other users cannot see your location</Text>
                        </>
                  }
                </View>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity
                style={profile.item}
                onPress={() => this.logout()}
              >
                {this.state.isLogoutLoading
                  ? <LoadingIcon type={2} style={{ height: 30, width: 30 }} />
                  : <Text style={profile.itemIcon}>
                    <FontAwesomeIcon icon={faSignOutAlt} size={20} />
                  </Text>}
                <View style={profile.itemContent}>
                  <Text style={profile.itemName}>Logout</Text>
                  <Text style={profile.itemInfo}>End your session</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {this.state.edit && <View style={profile.form}>
            <Text style={{
              width: '100%', 
              padding: 12,
              textAlign: 'center'
            }}
              onPress={() => this.setState({ ...this.state, edit: !this.state.edit })}
            >Close</Text>
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'username')}
              placeholder="Username"
              onChangeText={(text) => this.handleOnChange(text, { form: 'username' })}
              defaultValue={this.props.auth.data.username}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'full_name')}
              placeholder="Full Name"
              onChangeText={(text) => this.handleOnChange(text, { form: 'full_name' })}
              defaultValue={this.props.auth.data.full_name}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'email')}
              placeholder="Email"
              onChangeText={(text) => this.handleOnChange(text, { form: 'email' })}
              defaultValue={this.props.auth.data.email}
            />
            <TextInput
              style={profile.input}
              onChangeText={text => this.handleOnChange(text, 'password')}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => this.handleOnChange(text, { form: 'password' })}
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
