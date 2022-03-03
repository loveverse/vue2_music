import http from './http';

export const getFindData = () => http('/find', {}, 'GET')