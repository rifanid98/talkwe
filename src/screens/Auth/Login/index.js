import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import { globalStyles as styles } from 'assets';
import { Logo, FlashMessage, LoadingButton } from 'components';
import { loginSchema, createFormData } from 'utils';
import { connect } from 'react-redux';
import { login } from 'modules';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
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
      password: this.state.password,
    }
    try {
      await loginSchema.validateAsync(data)
      this.setState({
        ...this.state,
        error: ''
      }, () => {
          const formData = createFormData(data)
          this.props.login(formData)
            .then(res => {
              if ('status' in res.value && parseInt(res.value.status) === 200) {
                
              } else {
                Alert.alert('Login Failed', 'Please try again...')
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
              Alert.alert('Login Failed', errorMessage)
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
                    Login
                  </Text>
                )
            }
            {/* <Text style={styles.p}>Forgot Password ?</Text> */}
          </View>
          <View style={[styles.footer, styles.absolute]}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Text
              style={[styles.footerText, styles.orangeFont]}
              onPress={() => this.props.navigation.navigate('register')}
            > Sign Up</Text>
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
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);