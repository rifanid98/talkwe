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
  headerSearch: {
    backgroundColor: color.primary,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 23,
    paddingTop: 23,
    marginTop: 13,
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  menuButton: {
    paddingVertical: 12
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontFamily: font.heading,
    fontSize: 20
  },
  title: {
    fontFamily: font.heading,
    fontSize: 20
  },
  small: {
    fontFamily: font.body,
    fontSize: 16
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
    fontSize: 20,
    textTransform: 'capitalize'
  },
  friendStatus: {
    fontFamily: font.body,
    fontSize: 14
  },
  inputSearch: {
    flex: 1,
    fontFamily: font.body,
    fontSize: 16,
    padding: 12
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
    maxWidth: '80%',
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
    maxWidth: '80%',
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
  },


  contacts: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
  },
  contact: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contactImage: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 30
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12
  },
  contactName: {
    fontFamily: font.bodyBold,
    fontSize: 18,
    textTransform: 'capitalize'
  },
  contactText: {
    fontFamily: font.body,
    fontSize: 14,
    textTransform: 'capitalize'
  },
  contactStatus: {
    fontFamily: font.bodyBold,
    fontSize: 16,
    color: color.accent
  }
})

export default chatStyles;