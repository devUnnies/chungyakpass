import axios from 'axios';
import storage from '../store';

const instance = axios.create({
    baseURL: 'http:///3.37.99.145:8080/',
});

const interceptorsRequestFulfilled = (config) => {
    return {
        ...config,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=UTF-8',
            // prettier-ignore
            'Authorization': `Bearer ${storage.get('user-token') ? storage.get('user-token') : null}`,
        },
    };
};

instance.interceptors.request.use(interceptorsRequestFulfilled);

const interceptorsResponseFulfilled = (res) => {
    if (res.status >= 200 && res.status < 300) {
        return res.data;
    }

    return Promise.reject(res.data);
};

const interceptorsResponseRejected = (error) => {
    if (error.response?.data?.message != null) {
        return {
            ...error.response.data,
            message: error.response?.data?.message,
        };
    }

    return Promise.reject(new Error(error.response?.data?.message ?? error));
};

instance.interceptors.response.use(
    interceptorsResponseFulfilled,
    interceptorsResponseRejected
);

export const get = (...args) => instance.get(...args);

export const post = (...args) => instance.post(...args);

export const put = (...args) => instance.put(...args);

export const patch = (...args) => instance.patch(...args);

export const del = (...args) => instance.delete(...args);
