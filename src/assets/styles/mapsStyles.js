import { StyleSheet } from 'react-native'
import { colorScheme as color, font } from '.';

const mapsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.primary,
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    padding: 12,
    marginTop: 20
  },
  maps: {
    flex: 1,
    width: '100%',
  },
  markerImage: {
    width: 30,
    height: 30,
    borderRadius: 100
  },


  panel: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 50,
    paddingTop: 30,
    backgroundColor: color.primary,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    alignItems: 'center',
  },
  panelContainer: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20
  },
  dragHandler: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignSelf: 'stretch',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelButtonToggle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  panelButton: {
    width: '100%',
    height: 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  
  line: {
    width: 150,
    borderWidth: 2,
    borderColor: 'black',
  },
  label: {
    textAlign: 'left',
    width: '100%',
    fontFamily: font.heading,
    fontSize: 20,
    color: color.accent
  },
  listItems: {
    // flex: 1,
    width: '100%',
    marginTop: 30,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 100
  },
  itemContent: {
    flex: 1,
    marginHorizontal: 12
  },
  name: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    textTransform: 'capitalize'
  },
  status: {
    fontFamily: font.body,
    fontSize: 20
  },
  itemAction: {
    // padding: 12,
    alignItems: 'flex-end'
  },
  distance: {
    fontFamily: font.bodyBold,
    fontSize: 20,
    color: 'gray'
  },
  button: {
    backgroundColor: color.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: font.bodyBold,
    color: color.primary,
    textAlign: 'center',
    borderRadius: 12,
    marginLeft: 12
  }
})

export default mapsStyles;