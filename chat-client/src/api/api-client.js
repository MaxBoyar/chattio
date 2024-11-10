import axios from 'axios';
import {
    CREATE_CHANNEL_ROUTE,
    GET_ALL_CONTACTS_ROUTE,
    GET_ALL_MESSAGES_ROUTE,
    GET_CHANNEL_MESSAGES_ROUTE,
    GET_DM_CONTACTS_ROUTE,
    GET_USER_CHANNELS_ROUTE,
    HOST,
    LOGOUT_ROUTE,
    SEARCH_CONTACTS_ROUTE,
    USER_INFO_ROUTE,
} from '../utils/constants.js';

export const apiClient = axios.create({
    baseURL: HOST,
});

export class ApiService {
    static async getUserInfo() {
        return await apiClient.get(USER_INFO_ROUTE, {
            withCredentials: true,
        });
    }

    static async logout() {
        return await apiClient.post(
            LOGOUT_ROUTE,
            {},
            { withCredentials: true }
        );
    }

    static async searchContacts(searchTerm) {
        return await apiClient.post(
            SEARCH_CONTACTS_ROUTE,
            { searchTerm },
            { withCredentials: true }
        );
    }

    static async getDmContacts() {
        return await apiClient.get(GET_DM_CONTACTS_ROUTE, {
            withCredentials: true,
        });
    }

    static async getAllContacts() {
        return await apiClient.get(GET_ALL_CONTACTS_ROUTE, {
            withCredentials: true,
        });
    }

    static async getMessages(id) {
        return await apiClient.post(
            GET_ALL_MESSAGES_ROUTE,
            { id: id },
            { withCredentials: true }
        );
    }

    static async getChannelMessages(id) {
        return await apiClient.get(`${GET_CHANNEL_MESSAGES_ROUTE}/${id}`, {
            withCredentials: true,
        });
    }

    static async createChannel(channelName, members) {
        return await apiClient.post(
            CREATE_CHANNEL_ROUTE,
            { name: channelName, members: members },
            { withCredentials: true }
        );
    }

    static async getUserChannels() {
        return await apiClient.get(GET_USER_CHANNELS_ROUTE, {
            withCredentials: true,
        });
    }
}
