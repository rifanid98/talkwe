import { API_URL, ACTIVE_CONFIG, ORIGIN } from "configs/env";

const activeConfig = ACTIVE_CONFIG;
// const origin = window.location.origin;
const constants = {
  dev: {
    url: {
      api: API_URL,
      assets: ORIGIN + '/talkwe/images',
      origin: ORIGIN,
    },
  },

  prod: {
    url: {
      api: API_URL,
      assets: ORIGIN + '/talkwe/images',
      origin: ORIGIN,
    },
  },
};

const appConfig = constants[activeConfig];

export default appConfig;
