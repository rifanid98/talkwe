import { StyleSheet } from 'react-native'
import { colorScheme as color, font} from '.';

const fontBody = {
  fontFamily: font.body
}
const fontBodyBold = {
  fontFamily: font.bodyBold
}
const fontHeading = {
  fontFamily: font.heading
}

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  // position
  relative: {
    position: 'relative'
  },
  absolute: {
    position: 'absolute'
  },

  // color
  orangeFont: {
    color: color.font.secondary
  },

  // flashMessage
  flashMessage: {
    position: 'absolute',
    padding: 12,
    backgroundColor: color.accent,
    top: 0,
    right: 0,
    left: 0,
  },
  flashMessageText: {
    color: color.primary,
    ...fontBody,
    fontSize: 16,
    textAlign: 'center'
  },

  // form
  form: {
    width: '100%'
  },
  input: {
    backgroundColor: color.secondary.orange,
    marginBottom: 12,
    height: 44,
    fontSize: 16,
    paddingHorizontal: 12
  },
  button: {
    height: 44,
    paddingHorizontal: 12,
    textAlign: 'center',
    backgroundColor: color.accent,
    color: color.primary,
    fontSize: 20,
    paddingVertical: 8,
    ...fontBodyBold
  },
  p: {
    ...fontBodyBold,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: color.font.secondary
  },

  // footer
  footer: {
    bottom: 14,
    flexDirection: 'row',
  },
  footerText: {
    ...fontBodyBold,
    fontSize: 20
  },

  // loading
  loadingButton: {
    height: 44,
    paddingHorizontal: 12,
    textAlign: 'center',
    backgroundColor: color.accent,
    color: color.primary,
    fontSize: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...fontBodyBold
  },
  loadingIcon: {
    height: 40,
    width: 40
  }
})

export default globalStyles;