import { API_URL, ACTIVE_CONFIG, ACTIVE_ORIGIN } from '@env';
const activeConfig = ACTIVE_CONFIG;
const activeOrigin = ACTIVE_ORIGIN;
// const origin = window.location.origin;

const origin = {
  wifi: '192.168.43.81',
  lan: '192.168.42.15',
};
const originConfig = origin[activeOrigin]
const port = 3000;
const constants = {
  dev: {
    url: {
      api: `http://192.168.42.15:3000/talkwe/api/v1`,
      assets: '../assets',
      origin: `http://192.168.42.15:3000`,
    },
  },

  production: {
    url: {
      api: API_URL,
      assets: '',
      origin: '',
    },
  },
};

const appConfig = constants[activeConfig];

export default appConfig;
