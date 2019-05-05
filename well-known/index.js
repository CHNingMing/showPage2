
var $ = document.querySelectorAll.bind(document);
var $1 = document.querySelector.bind(document);

window.onload = function(){
    var requestdb = window.indexedDB.open('stableDB',2);
    requestdb.onsuccess = ()=>{
        var db_s = requestdb.result;
        console.log('打开成功!');
    }
    requestdb.onupgradeneeded = ()=>{
        //创建表
        var db_s = requestdb.result;
        var store = db_s.createObjectStore('statent',{keyPath: 'id'});
        store.createIndex('name','name',{ unique:false });
        store.createIndex('email','email',{ unique:true });
        store.transaction.oncomplete = ()=>{
            console.log('创建完毕，开始写入数据...');
            
        }

    }
    requestdb.onerror = ()=>{
        console.log('打开失败！');
    }


}
var request;
var db;
function openDB1(){
    request1 = window.indexedDB.open('testDB',2);
    request.onerror = ()=>{
        console.log('操作失败');
    }
    request.onsuccess = ()=>{
        console.log('操作成功')
    }
}
function openDB(){
    request = window.indexedDB.open("testDB",1);
    request.onerror = ()=>{
        console.log('打开错误');
    }
    request.onsuccess = (event)=>{
        db = request.result;
        db.onerror = (event)=>{
            console.log(event.target.errorCode);
        }
        console.log('打开成功！');
        var jsonObj = {id:1,name:'zhangsan',age:24};
        add(jsonObj);
        //read(1);
        //readAll();
        search('zhangsan');
        update();
        // setTimeout(function(){
        //     deletea(1);
        // },2000);
        
    }
    request.onupgradeneeded = (event)=>{
        console.log('触发升级');
        db = event.target.result;
        //创建数据库表
        var objectStore = db.createObjectStore('person',{keyPath:'id'});
        var objectStore1 = db.createObjectStore('person1',{autoIncrement: true});
        //为表添加索引
        objectStore.createIndex('name','name',{unique: false});
    }
    
    return db;
}
function add(value){
    var requestDB = db.transaction(['person'],'readwrite').objectStore('person').add(value);
    var objectStore = db.transaction(['person']).objectStore('person');
    requestDB.onsuccess = ()=>{
        console.log("success write!");
    }
    requestDB.onerror = ()=>{
        console.log("error write!");
    }
}
function read(key){
    var transaction = db.transaction(['person']);
    var objectStore = transaction.objectStore('person');
    var reqread = objectStore.get(key);
    reqread.onerror = function(event){
        console.log('事务失败');
    }
    var result;
    reqread.onsuccess = function(event){
        if( reqread.result ){
            result = reqread.result;
            console.log(result);
        }else{
            console.log('没有数据');
        }
    }
    return undefined;
}

function sleeptime(time){
    var date = new Date();
    var starttime = date.getTime() + time;
    while( true ){
        if( new Date().getTime() == starttime ){
            return ;
        }
    }
}

function readAll(){
    var transaction = db.transaction(['person']);
    var objectStore = transaction.objectStore('person');
    objectStore.openCursor().onsuccess = (event)=>{
        var cursor = event.target.result;
        if( cursor ){
            console.log(cursor.key);
            console.log(cursor.value);
        }else{
            console.log('完成');
        }
        
    }
}

function update(){
    var transaction = db.transaction(['person'],'readwrite');
    var objectStore = transaction.objectStore('person');
    objectStore.put({id: 1,name: '测试修改名称',age: -1});
    objectStore.onsuccess = function(){
        console.log('修改成功！');
    }
    objectStore.onerror = function(){
        console.log('修改失败！');
    }
}

function deletea(key){
    var request = db.transaction(['person'],'readwrite').objectStore('person').delete(key);
    request.onsuccess = ()=>{
        console.log('删除成功！');
    }
}

function search(keyword){
    var transaction = db.transaction(['person']);
    var store = transaction.objectStore('person');
    var index = store.index('name');
    var request = index.get(keyword);

    request.onsuccess = (e)=>{
        var result = e.target.result;
        if(result){
            console.log(result);
        }else{
            console.log('没有查询到记录！');
        }

    }

}

