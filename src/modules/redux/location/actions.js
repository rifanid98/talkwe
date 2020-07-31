import actionType from './actionType';
import Axios from 'axios';
import { apiUri } from 'configs';

export const setLocation = (data) => {
  return {
    type: actionType.SET_LOCATION,
    payload: data,
  };
};
export const getAddress = (latlang) => {
  const lat = latlang.split(',')[0];
  const lon = latlang.split(',')[1];
  return {
    type: actionType.GET_ADRESS,
    payload: Axios({
      method: 'GET',
      url: `${apiUri.locationIQ.reverseGeocoding}&lat=${lat}&lon=${lon}&format=json`
    }),
  };
};