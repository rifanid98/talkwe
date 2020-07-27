import appConfig from './appConfig';

const apiUri = {
  auth: {
    login: `${appConfig.url.api}/auth/login`,
    register: `${appConfig.url.api}/auth/register`,
    refreshtoken: `${appConfig.url.api}/auth/refreshtoken`,
  },
  users: `${appConfig.url.api}/users`,
  friends: `${appConfig.url.api}/friends`,
  messages: `${appConfig.url.api}/messages`,
  attachments: `${appConfig.url.api}/attachments`,
};

export { apiUri };
