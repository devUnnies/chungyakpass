import { get } from './instance';

export const allRecord = () => get(`verification/record/all`);

export const allPointRecord = () => get(`point/record/all`);
