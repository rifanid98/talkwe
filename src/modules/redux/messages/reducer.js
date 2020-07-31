import actionType from './actionType';
import { Alert } from 'react-native';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  isSending: false,
  data: [],
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_MESSAGES_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_MESSAGES_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_MESSAGES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    case actionType.ADD_MESSAGE_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSending: true,
      };
    case actionType.ADD_MESSAGE_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSending: false,
        errorMsg: 'Data Rejected',
      };
    case actionType.ADD_MESSAGE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSending: false,
        errorMsg: '',
      };

    case actionType.PATCH_MESSAGE_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.PATCH_MESSAGE_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.PATCH_MESSAGE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.DELETE_MESSAGE_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.DELETE_MESSAGE_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.DELETE_MESSAGE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.GET_MESSAGES_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_MESSAGES_LIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_MESSAGES_LIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    case actionType.GET_CONVERSATIONS_MESSAGES_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_CONVERSATIONS_MESSAGES_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_CONVERSATIONS_MESSAGES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    case actionType.SET_MESSAGE_STATUS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.SET_MESSAGE_STATUS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.SET_MESSAGE_STATUS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.GET_MESSAGE_STATUS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_MESSAGE_STATUS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_MESSAGE_STATUS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    default:
      return state;
  }
};

export default messages;
