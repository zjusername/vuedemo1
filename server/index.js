//http加载模块
 let http=require('http');
 console.log("请打开浏览器,输入地址http://127.0.0.1:3000/")
 //创建http服务器，监听网址127.0.0.1端口3000
 http.createServer(function(req,res){
    res.end('hello,world');
    console.log('right');
}).listen(3000,'127.0.0.1');

