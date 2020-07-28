import React from 'react'
import { globalStyles as styles } from 'assets';
import { Text, View } from 'react-native';

const FlashMessage = (props) => {
  return (
    <>
      <View style={styles.flashMessage}>
        <Text style={styles.flashMessageText}>{props.message && props.message}</Text>
      </View>
    </>
  )
}

export default React.memo(FlashMessage);