import { StyleSheet } from 'react-native'

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maps: {
    flex: 1,
    width: '100%',
    height: 300
  },

  // Global
  flex1: {
    flex: 1
  },


  // Button
  button: {
    padding: 10,
    fontSize: 15
  },
  buttonPrimary: {
    backgroundColor: 'lightblue'
  }
})

export default mainStyles;