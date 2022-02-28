import ajax from './ajax';


// 手机号登录
const reqLogin = (phone, password) => ajax("/login/cellphone", { phone, password })
// 生成二维码的key
const reqKey = () => ajax("/login/qr/key")
// 二维码生成接口(可选参数qrimg传入后会额外返回二维码图片 base64 编码)
const reqQrCode = () => ajax("/login/qr/create")
// 退出登录
const reqLotout = () => ajax('/logout')
// 用户详情
const reqUserDetail = (uid) => ajax(`/user/detail?uid=${uid}`)
// 获取推荐歌单
// const reqRecommendThePlayList = () => ajax('/recommend/resource')
// 获取热门歌单分类
const reqHotSongList = () => ajax('/playlist/hot')
// 获取热门歌单中网友精选碟歌单(order：new，默认为hot    cat: tag,默认为全部    limit: 取出歌单数量,默认为50    offset: 偏移数量)
const reqPlayList = (cat,limit) => ajax("/top/playlist", {cat,limit,timestamp: Date.now()})

// 获取歌单详情动态
// const reqSongListDetail = (id) => ajax('/playlist/detail/dynamic', {id})



export {
    reqLogin,
    reqKey,
    reqQrCode,
    reqLotout,
    reqUserDetail,
    // reqRecommendThePlayList,
    reqHotSongList,
    // reqSongListDetail,
    reqPlayList
}