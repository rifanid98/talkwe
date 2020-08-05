import React from 'react'
import { View } from 'react-native'

const BadgeOnlineStatus = (props) => {
  const {
    height,
    width,
    color,
    style
  } = props;

  return (
    <View style={{
      height: height,
      width: width,
      backgroundColor: color,
      borderRadius: 100,
      marginRight: 5,
      ...style
    }}></View>
  )
}

export default React.memo(BadgeOnlineStatus);