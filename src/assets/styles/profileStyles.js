import { StyleSheet } from 'react-native'
import { colorScheme as color, font } from '.';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: color.primary,
    paddingHorizontal: 24,
  },

  // header
  header: {
    marginTop: 24,
    width: '100%',
    height: 30,
    alignItems: 'flex-start'
  },

  // profile
  profile: {
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 200,
    marginBottom: 12,
  },
  name: {
    textAlign: 'center',
    fontFamily: font.heading,
    fontSize: 27,
    textTransform: 'capitalize'
  },
  email: {
    textAlign: 'center',
    fontFamily: font.body,
    fontSize: 20,
  },
  location: {
    textAlign: 'center',
    fontFamily: font.body,
    fontSize: 20,
    textTransform: 'capitalize'
  },

  // lists
  lists: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 40
  },
  item: {
    flexDirection: 'row',
    marginBottom: 12
  },
  itemIcon: {
    alignSelf: 'center'
  },
  itemContent: {
    marginLeft: 12,
  },
  itemName: {
    fontFamily: font.bodyBold,
    fontSize: 16
  },
  itemInfo: {
    fontFamily: font.body,
    fontSize: 16
  },

  // form
  form: {
    position: 'absolute',
    backgroundColor: color.primary,
    bottom: 0,
    right: 0,
    left: 0,
    padding: 30
  },
  input: {
    fontFamily: font.body,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: color.secondary.orange,
    paddingHorizontal: 12
  },
  button: {
    backgroundColor: color.accent,
    color: color.primary,
    textAlign: 'center',
    paddingVertical: 12,
    fontFamily: font.bodyBold,
    fontSize: 20
  }
})

export default profileStyles;