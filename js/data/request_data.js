/* 
	所有网络请求
 */
// 请求对象
var xhr;
/**
 * 	Post请求
 * @param {Object} url 请求路径
 * @param {Object} param 请求参数
 * @param {Object} respFun 请求回调
 * @param {Boolean} async 是否异步
 */
function req_post(url,param,respFun,async){
    requestReady(url,param,respFun);
    async = async == undefined ? true : async;
    xhr.open('post',url,async);
    xhr.send(param);
}
/**
 * 	Get请求
 * @param {Object} url 请求路径
 * @param {Object} param 请求参数 / 回调函数
 * @param {Object} respFun 请求回调
 * @param {Boolean} async 是否异步
 */
function req_get(url,param,respFun,async){
    requestReady(url,param,respFun);
    async = async == undefined ? true : async;
	xhr.open('get',url,async);
	xhr.send(param);
}

function requestReady(url,param,respFun){
    this.xhr = new XMLHttpRequest();
    if( url == undefined ){
        throw new Error('url:必传');
    }
    param = param == undefined ? {} : param;
    if( param instanceof Function){
        respFun = param;
        param = {};
    }
    respFun = respFun == undefined ? function () {} : respFun;
    xhr.onreadystatechange = function(){
        if( xhr.readyState == 4 && xhr.status == 200 ){
            respFun(JSON.parse(xhr.response));
            // respFun(JSON.parse(xhr.response));
        }
    }
    return xhr;
}

