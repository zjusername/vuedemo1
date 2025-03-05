//新增
const { Result } = require('ant-design-vue');
const pool=require('./db');
async function insertData() {
    try{
        const [result]=await pool.execute(
            'insert into user(name,number) values(?,?)',
            ['张三','123456789']
        );
        console.log('插入成功，插入的ID为：', result.insertId);
    }catch(error){
        console.log('插入数据出错：',error)
    }
    
}
insertData();