import http from './http';

export const reqFindData = () => http('/find', {}, 'GET')

export const reqAddData = (content) => http('/add', {content}, "GET")

export const reqUpdateData = (id, content) => http('/update', {id, content}, "GET")

export const reqDelData = (id) => http('/del', {id}, "GET")