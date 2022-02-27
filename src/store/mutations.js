import { Message } from 'element-ui';
export default {
    SAVE_USER(state, user){
        state.token = user.token
        // console.log(user);
        // 保存id获取用户详情歌单
        state.id = user.account.id
        // 保存cookie添加到请求头上
        state.cookie_music = user.cookie
        // console.log(user);
        // 隐藏消息框
        state.dialogVisible = false
        Message.success("登录成功")
    },
    SAVE_DIA(state, data){
        state.dialogVisible = data
    },
    RESET_TOKEN(state){
        state.token = ''
        state.cookie_music = ''
        localStorage.removeItem('cookie_music')
        localStorage.removeItem('token_key')
        Message.success("退出登录成功")
    },
    SAVE_RECOMMENDLIST(state, data){
        state.recommendList = data
    },
    SAVE_HOTSONGLIST(state, data){
        state.hotSongList = data
    }
}