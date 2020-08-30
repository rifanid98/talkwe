import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USERS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_USERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_USERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data,
      };

    case actionType.ADD_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.ADD_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.ADD_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.PATCH_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.PATCH_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.PATCH_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.DELETE_USER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.DELETE_USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.DELETE_USER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.GET_USERS_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_USERS_LIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_USERS_LIST_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };
    
    // case actionType.DELETE_CONVERSATION_PENDING:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isError: false,
    //   };
    // case actionType.DELETE_CONVERSATION_REJECTED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: true,
    //     errorMsg: 'Data Rejected',
    //   };
    // case actionType.DELETE_CONVERSATION_FULFILLED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isError: false,
    //     errorMsg: '',
    //   };

    default:
      return state;
  }
};

export default users;
