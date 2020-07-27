import actionType from './actionType';

const initialState = {
  firstRun: true,
};

const apps = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FIRST_RUN:
      return {
        ...state,
        firstRun: action.payload,
      };

    default:
      return state;
  }
};

export default apps;
