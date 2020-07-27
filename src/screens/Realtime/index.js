import React, { useEffect, Component, PureComponent } from 'react';
import { Text } from 'react-native';
import io from 'socket.io-client';
import { mainStyles as styles } from 'assets';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

class Realtime extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    this.socket = io('http://192.168.42.15:3000');
    this.socket.on('product', (data) => {
      this.setState({
        products: [...this.state.products, data],
      });
    });
    Axios({
      method: 'GET',
      url: 'http://192.168.42.15:3000/products',
    })
      .then((res) => {
        this.setState(
          {
            products: res.data.data,
          },
          () => {
            console.log(this.state.products);
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }
  sendChat = () => {
    this.socket.emit('chat-message', 'hi from app :)');
  };
  render() {
    return (
      <>
        <Text>Realtime Screen</Text>
        <Text style={[styles.button, styles.buttonPrimary]} onPress={() => this.sendChat()}>
          Say Hi!
        </Text>
        <ScrollView>
          {this.state.products.map((product, index) => {
            return <Text key={index}>{product.name}</Text>;
          })}
        </ScrollView>
      </>
    );
  }
}

export default Realtime;
