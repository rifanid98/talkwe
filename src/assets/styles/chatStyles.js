import { StyleSheet } from 'react-native'
import { colorScheme as color, font } from '.';

const fontBody = {
  fontFamily: font.body
}
const fontBodyBold = {
  fontFamily: font.bodyBold
}
const fontHeading = {
  fontFamily: font.heading
}

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  // header
  header: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  menuButton: {
    paddingVertical: 12
  },
  friend: {
    flex: 1,
    flexDirection: 'row'
  },
  friendImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginLeft: 30
  },
  friendInfo: {
    justifyContent: 'center',
    marginLeft: 12
  },
  friendName: {
    fontFamily: font.bodyBold,
    fontSize: 20
  },
  friendStatus: {
    fontFamily: font.body,
    fontSize: 14
  },

  // content
  content: {
    marginHorizontal: -22,
    paddingVertical: 20,
  },
  sender: {
    flexDirection: 'row',
    marginBottom: 12
  },
  senderImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
    alignSelf: 'flex-end',
    marginBottom: 12
  },
  senderMessage: {
    width: '80%',
    marginLeft: 12,
  },
  senderText: {
    backgroundColor: color.secondary.orange,
    padding: 12,
    fontFamily: font.body,
    fontSize: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  timestamp: {
    fontFamily: font.body,
    paddingTop: 5,
    fontSize: 14
  },
  receiver: {
    marginBottom: 12,
    width: '80%',
    alignSelf: 'flex-end'
  },
  receiverMessage: {
    backgroundColor: color.secondary.blue,
    fontFamily: font.body,
    fontSize: 18,
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  checked: {
    padding: 5
  },

  // footer
  footer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    backgroundColor: color.secondary.red,
    borderRadius: 25,
    height: 66,
    paddingHorizontal: 20,
    paddingLeft: 12,
    paddingRight: 60,
    fontFamily: font.body,
    fontSize: 20
  },
  sendButton: {
    position: 'absolute',
    right: 12,
    bottom: 20,
    padding: 12,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  sendButtonIcon: {
    color: color.secondary.strongRed
  }
})

export default chatStyles;