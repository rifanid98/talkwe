import actionType from './actionType';

export const firstRun = (data) => {
  return {
    type: actionType.FIRST_RUN,
    payload: data,
  };
};
