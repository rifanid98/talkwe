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

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    paddingTop: 24,
    // paddingHorizontal: 24,
  },

  // header
  header: {
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  title: {
    flex: 1,
    fontFamily: font.bodyBold,
    fontSize: 24,
    paddingVertical: 12
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  menuIcon: {
    fontSize: 30,
    paddingVertical: 20,
    paddingLeft: 20,
    marginLeft: 5
  },

  // friends list
  friendsList: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 24
  },
  label: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    textTransform: 'uppercase',
    color: color.accent,
    paddingVertical: 12
  },
  friendsListItems: {
    flexDirection: 'row',
    paddingLeft: 22,
    marginLeft: -22,
    marginRight: -22
  },
  friendsListItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  friendsListItemImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  friendsListItemName: {
    textAlign: 'center',
    fontFamily: font.bodyBold,
    fontSize: 20,
    textTransform: 'capitalize'
  },

  // messages list
  messagesList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24
  }, 
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    textTransform: 'uppercase',
    color: color.accent,
    paddingVertical: 12
  },
  labelBadge: {
    marginLeft: 12,
  },
  messagesListItems: {
    paddingHorizontal: 22,
    marginHorizontal: -22
  },
  messagesListItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center'
  },
  messagesListItemImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginRight: 12,
  },
  messagesListItemContent: {
    flex: 1,
    marginLeft: 10
  },
  messagesListItemContentTitle: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    textTransform: 'capitalize'
  },
  messagesListItemContentText: {
    fontFamily: font.body,
    fontSize: 20,
  },
  messagesListItemInfo: {
    alignItems: 'center'
  },
  messagesListItemInfoTitle: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    color: 'lightgray'
  },
  messagesListItemInfoCircle: {
    fontFamily: font.bodyBold,
    fontSize: 15,
    backgroundColor: color.accent,
    color: color.primary,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 100
  },

  // button
  addMessageButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
})

export default homeStyles;