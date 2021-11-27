import { get } from './instance';

export const getRank = (token) => get(`/user/rank/${token}`);
