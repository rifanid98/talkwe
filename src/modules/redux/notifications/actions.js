import actionType from './actionType';

export const getNotifications = (id) => {
  return {
    type: actionType.GET_NOTIFICATION,
    payload: id,
  };
};
export const getNewNotification = (id) => {
  return {
    type: actionType.GET_NEW_NOTIFICATION,
    payload: id,
  };
};
export const addNotification = (data) => {
  return {
    type: actionType.ADD_NOTIFICATION,
    payload: data,
  };
};
export const readNotification = (id) => {
  return {
    type: actionType.READ_NOTIFICATION,
    payload: id,
  };
};
export const deleteNotification = (id) => {
  return {
    type: actionType.DELETE_NOTIFICATION,
    payload: id,
  };
};
