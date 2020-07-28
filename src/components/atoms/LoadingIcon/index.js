import React from 'react'
import { View, Image } from 'react-native';
import { globalStyles as styles } from 'assets';

const LoadingIcon = () => {
  return (
    <>
      <Image
        style={styles.loadingIcon}
        source={require('assets/images/loading.gif')}
      />
    </>
  )
}

export default React.memo(LoadingIcon);