/*
* 主页JS
* */
define (['request_fetch'],function (rfetch) {
	let nodeList = document.getElementById('nodeList');
	let indexModel = new Object();
	/**
	 * 加载文章列表
	 */
	indexModel.initMakedownList = function(){
		req_get('https://api.github.com/repos/CHNingMing/showPage2/contents/makedown',function (makedownList) {
			let top = 10;
			for(makedown of makedownList){
				let li = document.createElement('li');
				li.makedownContentUrl = makedown.url;
				li.onclick = function(){
					publicObj.goMakedown(this,this.makedownContentUrl);
				}
				li.classList.add('centerItemHover');
				li.style.top = top+'px';
				top += 100;
				let h3Title = document.createElement('h3');
				h3Title.innerText = makedown.name.substr(0,makedown.name.length - 3);
				li.append(h3Title);
				nodeList.append(li);
			}
		});
	}
	/***
	 * 打开文章页
	 * @param liDom 列表项DOM
	 * @param makedownUrl 文章内容URL
	 */
	publicObj.goMakedown = function (liDom, makedownUrl) {
		openPageStyle(liDom);
		req_get(makedownUrl,function (makedownContent) {
			let makeStr = decodeURIComponent(escape(window.atob(makedownContent.content)));
			let makedownDiv = document.createElement('div');
			makedownDiv.id = 'makedownDiv'
			makedownDiv.innerHTML = '<hr />'+marked(makeStr);
			makedownDiv.style.textAlign = 'left';
			liDom.append(makedownDiv);
			//开始设置后退按钮,加载好文档后添加后退按钮
			let backI = document.createElement('i');
			backI.id = 'backIcon';
			backI.innerText = '←';
			backI.onclick = function(){
				publicObj.backMakedown(this.parentElement);
			}
			//后退按钮样式
			backI.style.position = 'absolute';
			backI.style.top = 0;
			backI.style.left = 0;
			liDom.append(backI);
		});

	}

	/**
	 * 打开页面样式
	 * @param liDom 列表项DOM
	 */
	function openPageStyle(liDom){
		liDom.style.marginLeft = 0;
		//记录上次Top,方便还原到原来位置
		liDom.lastTop = liDom.style.top;
		liDom.style.top = 0;
		liDom.style.left = 0;
		liDom.style.marginTop = 0;
		liDom.style.backgroundColor = '#C7EDCC';
		liDom.style.width = '100%';
		liDom.style.zIndex = 99;
		liDom.style.cursor = 'default';
		liDom.style.height = 'auto';
		liDom.classList.remove('centerItemHover');
		liDom.onclick = function(){};
		//下拉最后
		setTimeout(function () {
			liDom.style.minHeight = '760px';
		},200);
		liDom.borderWidth = 0;
	}
	/***
	 * 后退回文章列表
	 * @param liDom
	 */
	publicObj.backMakedown = function(liDom){
		liDom.style.width = '80%';
		liDom.style.minHeight = '80px';
		liDom.style.top = liDom.lastTop;
		liDom.style.marginLeft = '10%';
		liDom.style.zIndex = 0;
		liDom.style.backgroundColor = '#0000';
		liDom.classList.add('centerItemHover');
		setTimeout(function () {
			liDom.onclick = function () {
				publicObj.goMakedown(this,this.makedownContentUrl);
			}
		},200);
		liDom.querySelector('#backIcon').remove();
		liDom.querySelector('#makedownDiv').remove();
	}

	return indexModel;
});


