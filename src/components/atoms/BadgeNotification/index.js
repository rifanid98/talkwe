import React from 'react'
import { View } from 'react-native';

const BadgeNotification = () => {
  return (
    <>
      <View style={{
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 10,
        width: 10,
        backgroundColor: 'orange',
        borderRadius: 100,
        right: 0,
        top: 20
      }}>
      </View>
    </>
  )
}

export default React.memo(BadgeNotification);