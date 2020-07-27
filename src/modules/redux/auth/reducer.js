import actionType from './actionType';

const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_AUTH_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.SET_AUTH_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.SET_AUTH_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload,
      };

    case actionType.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.LOGIN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.LOGIN_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data.data[0],
      };

    case actionType.REGISTER_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.REGISTER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
      };

    case actionType.REFRESH_TOKEN_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.REFRESH_TOKEN_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.REFRESH_TOKEN_FULFILLED:
      const data = action.payload.data.data;
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: {
          user_id: state.user_id,
          username: state.username,
          full_name: state.full_name,
          email: state.email,
          role: state.role,
          image: state.image,
          added: state.added,
          updated: state.updated,
          tokenLogin: data.tokenLogin,
          tokenRefresh: data.tokenRefresh,
        },
      };
    case actionType.LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default auth;
