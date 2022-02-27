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
const reqRecommendThePlayList = () => ajax('/recommend/resource')


export {
    reqLogin,
    reqKey,
    reqQrCode,
    reqLotout,
    reqUserDetail,
    reqRecommendThePlayList
}