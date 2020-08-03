import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getFriends = (token, params = '') => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_FRIENDS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.friends}${getParams}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const addFriend = (token, data) => {
  return {
    type: actionType.ADD_FRIEND,
    payload: Axios({
      method: 'POST',
      url: apiUri.friends,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const patchFriend = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_FRIEND,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.friends}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const deleteFriend = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_FRIEND,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.friends}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};

export const getDetailFriend = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_FRIENDS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.friends}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getFriendsList = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_FRIENDS_LIST,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.users}${getId}/friends`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getFriendsRequest = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_FRIENDS_REQUEST,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.friends}${getId}/request`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const confirmFriendRequest = (token, userID, friendID, action) => {
  return {
    type: actionType.CONFIRM_FRIEND_REQUEST,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.friends}/${userID}/${friendID}/${action}`,
      headers: {
        authorization: token,
      },
    }),
  };
};