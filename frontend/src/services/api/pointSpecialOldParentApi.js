import axios from 'axios';
import { post, get } from './instance';

// 노부모 가점 api
export const postOldParentPoint = (info) =>
    post('point/special/old-parents-support', {});

// 노부모 가점 순위 api
export const getOldParentPoint = () =>
    get('point/special/old-parents-support', {});
