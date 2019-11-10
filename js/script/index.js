define(function(){
	var user = {};
	user.name = 'ZhangSan';
	user.age = 20;
	user.address = '地址';
	user.showThis = ()=>{
		console.info(user.address);
	}
	return user;
})
