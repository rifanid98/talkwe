import appConfig from './appConfig';
import { LOCATION_IQ_PRIVATE_KEY } from '@env'

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
  locationIQ: {
    forwardGeocoding: `https://us1.locationiq.com/v1/search.php?key=${LOCATION_IQ_PRIVATE_KEY}&q=`,
    reverseGeocoding: `https://us1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_PRIVATE_KEY}`
  }
};

export { apiUri };
