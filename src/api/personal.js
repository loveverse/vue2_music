import http from './http';

// 查询
export const reqFindData = () => http('/find')

// 分页查询
export const reqPageFindData = (limit, page) => http('/pageQuery', {limit,page})
