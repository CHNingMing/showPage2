/**
 * Fetch 简单封装
 */
/**
 * 是否异步请求
 * @type {boolean} 默认: 是
 */
var FETCH_ISSYNC = true;

function req_get(url,param,respFun){
    if( url == undefined ){
        throw new Error('url 不能为空');
    }
    if( param instanceof Function ){
        respFun = param;
        param = {};
    }
    respFun = respFun == undefined ? function(){} : respFun;
    fetch(url,param).then((data) => {
        data.json().then((respData => {
            respFun(respData);
            return respData;
        }))
    });
}

