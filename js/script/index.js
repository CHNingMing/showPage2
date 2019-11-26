/*
* 主页JS
* */
var indexJS = new Object();
define (['request_fetch'],function (rfetch) {
	let nodeList = document.getElementById('nodeList');
	let indexModel = new Object();
	/**
	 * 加载文章列表
	 */
	indexModel.initMakedownList = function(){
		req_get('https://api.github.com/repos/CHNingMing/showPage2/contents/makedown',function (makedownList) {
			var top = 0;
			for(makedown of makedownList){
				let li = document.createElement('li');
				li.setAttribute('makedownContentUrl',makedown.url);
				li.onclick = function(){
					indexJS.goMakedown(this,this.makedownContentUrl);
				}
				li.style.top = top+'px';
				top += 100;
				li.innerText = makedown.name;
				nodeList.append(li);
			}
		});
	}
	/**
	 * 打开文章页
	 */
	indexJS.goMakedown = function (liDom, makedownUrl) {
		liDom.style.marginLeft = 0;
		liDom.style.marginTop = 0;
		liDom.style.backgroundColor = '#C7EDCC';
		liDom.style.top = 0;
		liDom.style.width = '100%';
		liDom.style.zIndex = 99;
		//下拉最后
		setTimeout(function () {
			liDom.style.height = '768px';
		},200)
	}
	return indexModel;
});


