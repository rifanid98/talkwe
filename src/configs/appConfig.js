import { API_URL, ACTIVE_CONFIG } from '@env';
const activeConfig = ACTIVE_CONFIG;
// const origin = window.location.origin;
const constants = {
  dev: {
    url: {
      api: `http://192.168.42.15:3000/talkwe/api/v1`,
      assets: '../assets',
      origin: `http://192.168.42.15:3000`,
    },
  },

  prod: {
    url: {
      api: API_URL,
      assets: '../assets',
      origin: `http://192.168.43.81:3000`,
    },
  },
};

const appConfig = constants[activeConfig];

export default appConfig;
