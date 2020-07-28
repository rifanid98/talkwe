import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import { globalStyles as styles } from 'assets';
import { Logo, FlashMessage, LoadingButton } from 'components';
import { registerSchema, createFormData } from 'utils';
import { connect } from 'react-redux';
import { register } from 'modules';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      full_name: '',
      email: '',
      password: '',
      error: ''
    }
  }
  handleOnChange = (text, state) => {
    this.setState({
      ...this.state,
      [state]: text
    })
  }
  handleSubmit = async () => {
    const data = {
      username: this.state.username,
      full_name: this.state.full_name,
      email: this.state.email,
      password: this.state.password,
    }
    try {
      await registerSchema.validateAsync(data)
      this.setState({
        ...this.state,
        error: ''
      }, () => {
        const formData = createFormData(data)
        this.props.register(formData)
          .then(res => {
            if ('status' in res.value && parseInt(res.value.status) === 201) {
              Alert.alert(
                'Sign Up Success',
                'Please login to continue',
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                  { text: "OK", onPress: () => this.props.navigation.goBack() }], { cancelable: false }
              );
            } else {
              Alert.alert('Sign Up Failed', 'Please try again...')
            }
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
            Alert.alert('Sign Up Failed', errorMessage)
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

  render() {
    return (
      <>
        <View style={[styles.container, styles.relative]}>
          {this.state.error.length > 0 && <FlashMessage message={this.state.error} />}
          <Logo height={100} width={100} />
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleOnChange(text, 'username')}
              placeholder="Username"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleOnChange(text, 'full_name')}
              placeholder="Full Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleOnChange(text, 'email')}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              onChangeText={text => this.handleOnChange(text, 'password')}
              placeholder="Password"
              secureTextEntry={true}
            />
            {
              this.props.auth.isLoading
                ? <LoadingButton />
                : (
                  <Text
                    style={styles.button}
                    onPress={() => this.handleSubmit()}
                  >
                    Sign Up
                  </Text>
                )
            }
          </View>
          <View style={[styles.footer, styles.absolute]}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Text
              style={[styles.footerText, styles.orangeFont]}
              onPress={() => this.props.navigation.goBack()}
            > Login</Text>
          </View>
        </View>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);