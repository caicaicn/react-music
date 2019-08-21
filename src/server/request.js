//引入axios
import axios from 'axios'
let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
    // 设置请求超时时间
    axios.defaults.timeout = config.timeout || 5000
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    //get 拦截处理
    // if (config.method === 'get') {
    //   //删除对象指定元素
    //   let items = config.params
    //   if(config.params.flagToken){
    //     let {flagToken, ...personUnknowName} = items
    //     config.params = personUnknowName
    //   }
    // }
    //post 拦截处理
    if (config.method === 'post') {
        //处理from参数
        config.transformRequest = [function(data) {
            let ret = []
            for (let it in data) {
              ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
            }
            //删除数组指定元素
            ret = ret.filter(obj=>obj!=='flagToken=true')
            return ret.join('&')||''
        }]
    }
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    if(response.data.code!=200){
        return Promise.reject(response);
    }else{
        return response
    }
}, err => {
    let errs = {
      data:{
        msg: '网络异常，稍后重试！',
        code: 408
      }
    }
    if (err && err.response) {
      errs = err.response
    }
    return Promise.reject(errs)
})

//设置请求域名
//axios.defaults.baseURL = baseApi||'/'
//设置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export default {
  //get请求
    get (url,param,timeout) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'get',
          url,
          params: param,
          timeout: timeout || 5000,
          withCredentials: true,
          crossDomain: true,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res.data)
        },err => {
          reject(err);
        }).catch((error) => {
          reject(error)
        })
      })
    },
  //post请求
    post (url,param,timeout) {
      return new Promise((resolve,reject) => {
        axios({
          method: 'post',
          url,
          data: param,
          timeout: timeout || 5000,
          withCredentials: true,
          crossDomain: true,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res.data)
        },err => {
          reject(err);
        }).catch((error) => {
          reject(error)
        })
      })
    }
}
