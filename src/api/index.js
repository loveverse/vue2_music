import http from './http';

// 网易云音乐热评API---------------------------------------
// 查询
export const reqFindData = () => http('/find')
// 分页查询
export const reqPageFindData = (limit, page) => http('/pageQuery', {limit,page})


// 书摘API---------------------------------------
export const reqFindExcerptData = () => http('/findExcerpt')
export const reqAddExcerptData = (params) => http('/addExcerpt', {params})
export const reqUpdateExcerptData = (id,content) => http('/updateExcerpt', {id,content})
