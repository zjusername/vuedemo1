//连接数据库
const mysql=require('mysql2');
const connection =mysql.createConnection({
    host:'localhost',//地址
    user:'root',//用户名
    password:'*********',//密码
    database:'demo',//连接库名
    port:3306//端口
}); 
connection.connect((err)=>{
    if(err){
        console.error('连接失败：'+err);
        return;
    }
    console.log('连接成功');
});
//导出
module.exports=connection;
//node使用时，注意插件认证是否报错，报错使用mysql2