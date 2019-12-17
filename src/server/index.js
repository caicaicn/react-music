/**/
import setRequest from './request';
let baseUrl = "http://192.168.43.14:3000";
const api = {
    // 获取歌单列表
    getPlayList: function (params) {
        return setRequest.get(baseUrl + "/top/playlist", params)
    },
    // 获取歌单详情
    getPlayListDetail: function (params) {
        return setRequest.get(baseUrl + "/playlist/detail", params)
    },
    // 获取排行榜（完整版）
    getTopList: function (params) {
        return setRequest.get(baseUrl + "/toplist/detail", params)
    },
    // 推荐歌单
    getRecomm: function (params) {
        return setRequest.get(baseUrl + "/personalized", params)
    }
}
export default api;


// import axios from 'axios'
// import { URL, defaultLimit } from '@/config'

// axios.interceptors.response.use(response => {
//     //欺骗自己的loading动画
//     // return new Promise(resolve => {
//     //   setTimeout(() => {
//     //     resolve(response)
//     //   }, 300)
//     // })
//     return response
// })

// //获取轮播
// export function getBanner() {
//     const url = `${URL}/banner`
//     return axios.get(url)
// }

// //获取推荐歌单
// export function getPersonalized() {
//     const url = `${URL}/personalized`
//     return axios.get(url)
// }

// //获取用户歌单详情
// export function getUserPlaylist(uid) {
//     const url = `${URL}/user/playlist`
//     return axios.get(url, {
//         params: {
//             uid
//         }
//     })
// }

// 获取排行榜（完整版）
// export function getTopListDetail() {
//     const url = `${URL}/toplist/detail`
//     return axios.get(url)
// }

// //获取歌单 ( 网友精选碟 )
// export function getTopPlaylist(page = 0, limit = defaultLimit, order = 'hot') {
//     const url = `${URL}/top/playlist`
//     return axios.get(url, {
//         params: {
//             offset: page * limit,
//             order,
//             limit
//         }
//     })
// }

// //获取歌单详情
// export function getPlaylistDetail(id) {
//     const url = `${URL}/playlist/detail`
//     return axios.get(url, {
//         params: {
//             id
//         }
//     })
// }

// // 搜索
// export function search(keywords, type = 1, page = 0, limit = defaultLimit) {
//     const url = `${URL}/search`
//     return axios.get(url, {
//         params: {
//             offset: page * limit,
//             type,
//             limit,
//             keywords
//         }
//     })
// }

// //热搜
// export function searchHot() {
//     const url = `${URL}/search/hot`
//     return axios.get(url)
// }

// //获取歌曲详情
// export function getMusicDetail(ids) {
//     const url = `${URL}/song/detail`
//     return axios.get(url, {
//         params: {
//             ids
//         }
//     })
// }
