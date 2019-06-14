// import Vue from 'vue';
import axios from 'axios';

// 默认超时设置
axios.defaults.timeout = 50000;

// 相对路径设置
axios.defaults.baseURL ='';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log(config);
    // 获取token
    const token = localStorage.getItem('cc_token');
    // 设置参数格式
    if(!config.headers['Content-Type']){
      config.headers = {
        'Content-Type':'application/json',
      };
    }
    // 添加token到headers
    if(token){
      config.headers.token = token
    }
    // 鉴权参数设置
    if(config.method === 'get'){
      //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      let json = JSON.parse(JSON.stringify(config.params));
      //一些参数处理
    }else{
      config.data = config.data || {};
      //一些参数处理
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    //一些统一code的返回处理
    if(response.data.code === 501){
      // 登录验证
      //做了个示例跳转项目中登录，并记录下相对路径
      router.push({
        name:'login', //从哪个页面跳转
        query:{
          retUrl:window.location.href.split('#')[1] || '',  //记录相对路径
          is_new_user_url:1
        }
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
);


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        if(response.data.code === 200){
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data);
        }else{
          //错误处理
          // Vue.$toast(response.data.msg);
          console.log(response.data.msg)
        }
      })
      .catch(err => {
        reject(err);
        let message = '请求失败！请检查网络';
        //错误返回
        if(err.response)message=err.response.data.message;
        // Vue.$toast(message);
        console.log(message)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data);
        }else{
          // Vue.$toast(response.data.msg)
          console.log(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        // Vue.$toast(message);
        console.log(message)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data);
        }else{
          // Vue.$toast(response.data.msg)
          console.log(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        // Vue.$toast(message)
        console.log(message)
      })
  })
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data);
        }else{
          // Vue.$toast(response.data.msg)
          console.log(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        // Vue.$toast(message);
        console.log(message)
      })
  })
}

 function del(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
      .then(response => {
        if(response.data.code === 200){
          resolve(response.data);
        }else{
          // Vue.$toast(response.data.msg);
          console.log(response.data.msg)
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        // Vue.$toast(message);
        console.log(message);
      })
  })
}

export default {
  post:post,
  get:get,
  patch:patch,
  put:put,
  del:del
}
