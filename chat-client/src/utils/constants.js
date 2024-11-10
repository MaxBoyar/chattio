export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/auth';
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;

export const CONTACTS_ROUTE = `api/contacts`;
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/search`;
export const GET_DM_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTE}/get-all-contacts`;

export const MESSAGES_ROUTE = `api/messages`;
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTE}/get-messages`;

export const CHANNEL_ROUTE = `api/channel`;
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/create-channel`;
export const GET_USER_CHANNELS_ROUTE = `${CHANNEL_ROUTE}/get-user-channels`;
export const GET_CHANNEL_MESSAGES_ROUTE = `${CHANNEL_ROUTE}/get-channel-messages`;
