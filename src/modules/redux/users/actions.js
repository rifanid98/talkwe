import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const getUsers = (token, params = '') => {
  const getParams = params ? `/${params}` : '';
  return {
    type: actionType.GET_USERS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.users}${getParams}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const addUser = (token, data) => {
  return {
    type: actionType.ADD_USER,
    payload: Axios({
      method: 'POST',
      url: apiUri.users,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const patchUser = (token, data, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.PATCH_USER,
    payload: Axios({
      method: 'PATCH',
      url: `${apiUri.users}${getId}`,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
    }),
  };
};
export const deleteUser = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.DELETE_USER,
    payload: Axios({
      method: 'DELETE',
      url: `${apiUri.users}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getDetailUser = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_USERS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.users}${getId}`,
      headers: {
        authorization: token,
      },
    }),
  };
};
export const getUsersList = (token, id) => {
  const getId = id ? `/${id}` : '';
  return {
    type: actionType.GET_USERS_LIST,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.users}${getId}/list`,
      headers: {
        authorization: token,
      },
    }),
  };
};
