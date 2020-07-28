import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getMessages = (token, params = '') => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_MESSAGES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.messages}${getParams}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const addMessage = (token, data) => {
  return {
    type: actionType.ADD_MESSAGE,
    payload: Axios({
      method: 'POST',
      url: apiUri.messages,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const patchMessage = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_MESSAGE,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.messages}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const deleteMessage = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_MESSAGE,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.messages}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};

export const getDetailMessage = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_MESSAGES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.messages}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getMessagesList = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_MESSAGES_LIST,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.users}${getId}/messages`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getConversationsMessage = (token, senderID, receiverID) => {
  return {
    type: actionType.GET_CONVERSATIONS_MESSAGES,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.messages}/${senderID}/${receiverID}`,
      headers: {
        authorization: token,
      },
    }),
  };
};