import { reqLogin, reqRecommendThePlayList } from '../api';
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
            // console.log(result);
            if (result.code === 200) {
                commit('SAVE_RECOMMENDLIST', result)
                return 'ok'
            } else {
                return Promise.reject(new Error("获取推荐歌单失败"))
            }

    }
}