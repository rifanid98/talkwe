const { Alert } = require("react-native");

export const alert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{ text: "Close", onPress: () => console.log('Close Pressed') },
      { text: "OK", onPress: () => console.log('Ok Pressed') }],
    { cancelable: false }
  );
}

export const getRole = (role) => {
  switch (role) {
    case 1:
      return 'Admin'

    case 2:
      return 'Staff'

    case 3:
      return 'User'

    default:
      return 'Undefined'
      break;
  }
}

export const createImageFormData = (body, image, field) => {
  const data = new FormData();

  (image !== undefined && image !== null) && data.append(field, {
    uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
    type: image.type,
    name: image.fileName,
  });

  (body !== undefined && body !== null) && Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export const createFormData = (body) => {
  const data = new FormData();

  (body !== undefined && body !== null) && Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};