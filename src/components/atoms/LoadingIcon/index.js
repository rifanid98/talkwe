import React from 'react'
import { View, Image } from 'react-native';
import { globalStyles as styles } from 'assets';

const LoadingIcon = (props) => {
  return (
    <>
      <Image
        style={[styles.loadingIcon, props.style ? props.style : {}]}
        source={require('assets/images/loading.gif')}
      />
    </>
  )
}

export default React.memo(LoadingIcon);