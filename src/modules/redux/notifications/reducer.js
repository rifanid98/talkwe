import actionType from './actionType';

// { user_id: 0, notif_message: '', notif_read: 0 }
const initialState = {
  notifications: [],
  getNotifications: [],
  getNewNotifications: []
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_NOTIFICATION:
      var notifications = state.notifications;
      var user_id = action.payload;
      var setNotifications = [];
      if (notifications !== undefined) {
        notifications.map((notif, index) => {
          if (parseInt(notif.user_id) === parseInt(user_id)) {
            setNotifications.push(notifications[index])
          }
        })
      }
      return {
        ...state,
        getNotifications: setNotifications
      };
    
    case actionType.GET_NEW_NOTIFICATION:
      var notifications = state.notifications;
      var user_id = action.payload;
      var setNotifications = [];
      if (notifications !== undefined) {
        notifications.map((notif, index) => {
          if (parseInt(notif.user_id) === parseInt(user_id) && parseInt(notif.read) === 0) {
            setNotifications.push(notifications[index])
          }
        })
      }
      return {
        ...state,
        getNewNotifications: setNotifications
      };
    
    case actionType.ADD_NOTIFICATION:
      var notifications = state.notifications;
      notifications.push(action.payload)
      return {
        ...state,
        notifications: notifications
      };

    case actionType.READ_NOTIFICATION:
      var notifications = state.notifications;
      var user_id = action.payload;
      notifications.map((notif, index) => {
        if (parseInt(notif.user_id) === parseInt(user_id)) {
          notifications[index].read = 1
        }
      })
      return {
        ...state,
        notifications: notifications
      };

    case actionType.DELETE_NOTIFICATION:
      var notifications = state.notifications;
      var user_id = action.payload
      notifications.map((notif, index) => {
        if (parseInt(notif.user_id) === parseInt(user_id)) {
          if (index > - 1) {
            notifications.splice(index, 1)
          }
        }
      })
      return {
        ...state,
        notifications: notifications,
      };
    
    default:
      return state;
  }
};

export default notifications;
