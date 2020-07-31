import actionType from './actionType';

const initialState = {
  isLoading: true,
  isError: false,
  errorMsg: '',
  data: {},
  location: {
    latitude: 0,
    longitude: 0,
  }
};

const location = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_LOCATION:
      return {
        location: action.payload,
      };

    case actionType.GET_ADRESS_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionType.GET_ADRESS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected',
      };
    case actionType.GET_ADRESS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMsg: '',
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export default location;
