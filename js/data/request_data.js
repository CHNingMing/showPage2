/* 
	所有网络请求
 */
// 请求对象
var xhr = new XMLHttpRequest();
/**
 * 	Post请求
 * @param {Object} url 请求路径
 * @param {Object} param 请求参数
 * @param {Object} respFun 请求回调
 */
function req_post(url,param,respFun){
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 && xhr.status == 200 ){
			respFun = respFun == undefined ? function(){} : respFun;
			respFun(JSON.stringify(xhr.response));
		}
	}
}
/**
 * 	Get请求
 * @param {Object} url 请求路径
 * @param {Object} param 请求参数
 * @param {Object} respFun 请求回调
 */
function req_get(url,param,respFun){
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 && xhr.status == 200 ){
			// respFun(JSON.parse(xhr.response));
			respFun(JSON.parse(xhr.response));
		}
	}
	xhr.open('get',url,true);
	xhr.send(param);
}


