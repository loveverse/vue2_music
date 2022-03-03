import http from './http';

export const getFindData = () => http('/find', {}, 'GET')

export const getAddData = (content) => http('/add', {content}, "GET")