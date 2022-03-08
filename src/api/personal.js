import http from './http';

export const reqFindData = () => http('/find', {}, 'GET')

export const reqAddData = (content) => http('/add', {content}, "GET")
