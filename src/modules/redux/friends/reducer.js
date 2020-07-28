import actionType from './actionType';
import { Alert } from 'react-native';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
};

const friends = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_FRIENDS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_FRIENDS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_FRIENDS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    case actionType.ADD_FRIEND_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.ADD_FRIEND_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.ADD_FRIEND_FULFILLED:
      console.log(action.payload, 'ini data payload');
      console.log(state);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.PATCH_FRIEND_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.PATCH_FRIEND_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.PATCH_FRIEND_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.DELETE_FRIEND_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.DELETE_FRIEND_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.DELETE_FRIEND_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.GET_FRIENDS_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_FRIENDS_LIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_FRIENDS_LIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default friends;
