const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;
const BASE_URL_SUPPORT_BOT = import.meta.env.VITE_BASE_URL_SUPPORT_BOT;

const BASE_URL_WEB = BASE_URL_API + "/web";
// const BASE_URL_WA = BASE_URL_API + "/wa";
const BASE_URL_UNIVERSAL = BASE_URL_API;

export const ENDPOINTS = {
  // ******** WEB ********
  //   AUTH API
  LOGIN: `${BASE_URL_WEB}/login`,
  REGISTER: `${BASE_URL_WEB}/register`,
  LOGOUT: `${BASE_URL_WEB}/logout`,
  TOKEN: `${BASE_URL_WEB}/token`,
  ME: `${BASE_URL_WEB}/me`,

  //   USER API
  USERS: `${BASE_URL_WEB}/users`,
  USERS_ID: (admin_id) => `${BASE_URL_WEB}/users/${admin_id}`,

  //   BOT LIST API
  BOTS: `${BASE_URL_WEB}/suika-bot-list`,
  BOTS_ID: (id) => `${BASE_URL_WEB}/suika-bot-list/${id}`,

  //  ******** SHARED ********
  //   SYSTEM-STATS API
  SYSTEM_STATS: `${BASE_URL_UNIVERSAL}/system-stats`,

  //  SHORTEN API
  GET_SHORTEN_URL: (shortUrl) => `${BASE_URL_UNIVERSAL}/s/${shortUrl}`,

  //  IDENTITIES API
  GET_IDENTITIES: (platform) =>
    `${BASE_URL_UNIVERSAL}/total-identities/${platform}`,
  FIND_IDENTITIES: (identity) =>
    `${BASE_URL_UNIVERSAL}/find-identity/${identity}`,
  UPDATE_IDENTITIES: (identity) =>
    `${BASE_URL_UNIVERSAL}/update-identity/${identity}`,

  // Restart SuikaBot
  RESTART_SUIKABOT: `${BASE_URL_SUPPORT_BOT}/negronta`,
};
