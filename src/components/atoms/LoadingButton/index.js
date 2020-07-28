import React from 'react'
import { View, Image } from 'react-native';
import { globalStyles as styles } from 'assets';

const LoadingButton = () => {
  return (
    <>
      <View style={styles.loadingButton}>
        <Image
          style={styles.loadingIcon}
          source={require('assets/images/loading.gif')}
        />
      </View>
    </>
  )
}

export default React.memo(LoadingButton);