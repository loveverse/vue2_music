import { reqHotSongList, reqLogin, reqRecommendThePlayList,reqSongListDetail,reqPlayList } from '../api';
export default {
    async getLogin({ commit }, { phone, password }) {
        const result = await reqLogin(phone, password)
        // console.log(result);
        if (result.code === 200) {
            localStorage.setItem('token_key', result.token)
            localStorage.setItem('cookie_music', result.cookie)
            commit('SAVE_USER', result)
            return 'ok'
        } else {
            return Promise.reject(new Error("用户登录失败"))
        }
    },
    async getRecommendList({ commit }) {
        const result = await reqRecommendThePlayList()
        if (result.code === 200) {
            commit('SAVE_RECOMMENDLIST', result)
            return 'ok'
        } else {
            return Promise.reject(new Error("获取推荐歌单失败"))
        }
    },
    async getHotSongList({commit}){
        const result = await reqHotSongList()
        // console.log(result);
        if (result.code === 200) {
            commit('SAVE_HOTSONGLIST', result)
            return 'ok'
        } else {
            return Promise.reject(new Error("获取热门歌单失败"))
        }
    },
    async getSongListDetail({commit}, id){
        const result = await reqSongListDetail(id)
        // console.log(result); 
        if (result.code === 200) {
            commit('SAVE_SONG_LIST_DETAIL', result)
            return 'ok'
        } else {
            return Promise.reject(new Error("获取歌单详情动态失败"))
        }
    },
    async getPlayList({commit}, {cat, limit}){
        const result = await reqPlayList(cat,limit)
        // console.log(result);
        if (result.code === 200) {
            commit('SAVE_PLAY_LIST', result)
            return 'ok'
        } else {
            return Promise.reject(new Error("获取网友精选碟歌单失败"))
        }
    }
}