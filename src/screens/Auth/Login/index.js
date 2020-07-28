import React, { Component } from 'react'
import { Text, View, TextInput, Button, Alert, Image } from "react-native";
import { globalStyles as styles } from 'assets';
import { Logo, FlashMessage, LoadingButton } from 'components';
import { loginSchema } from 'utils';

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
            {/* <LoadingButton /> */}
            <Text
              style={styles.button}
              onPress={() => this.handleSubmit()}
            >
            Login
            </Text>
            <Text style={styles.p}>Forgot Password ?</Text>
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

export default Login;