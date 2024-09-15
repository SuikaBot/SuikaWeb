const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

const BASE_URL_WEB = BASE_URL_API + "/web";
const BASE_URL_WA = BASE_URL_API + "/wa";
const BASE_URL_UNIVERSAL = BASE_URL_API;

export const ENDPOINTS = {
  // AUTH API
  LOGIN: `${BASE_URL_WEB}/login`,
  REGISTER: `${BASE_URL_WEB}/register`,
  LOGOUT: `${BASE_URL_WEB}/logout`,
  TOKEN: `${BASE_URL_WEB}/token`,
  ME: `${BASE_URL_WEB}/me`,

  //   SYSTEM-STATS API
  SYSTEM_STATS: `${BASE_URL_WEB}/system-stats`,

  //   USER API
  USERS: `${BASE_URL_WEB}/users`,
  USERS_ID: function (id) {
    return `${BASE_URL_WEB}/users/${id}`;
  },

  //  SHORTEN API
  GET_SHORTEN_URL: function (shortUrl) {
    return `${BASE_URL_UNIVERSAL}/${shortUrl}`;
  },
};
