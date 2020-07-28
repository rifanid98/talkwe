import React from 'react'
import { Image } from 'react-native'

const Logo = (props) => {
  return(
    <>
      <Image
        source={require('assets/images/logo.png')} 
        style={{
          width: props.width,
          height: props.height
        }}
        />
    </>
  )
}

export default React.memo(Logo)