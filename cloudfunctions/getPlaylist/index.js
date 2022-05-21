// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// const rp = require('request-promise');
const axios = require('axios')
// const URL='https://apis.imooc.com/personalized?icode='
// 云函数入口函数
exports.main = async (event, context) => {
    const plRes = await axios.get(URL)
    if(cloud.database.code >=1000){
        consnole.log(data.msg)
        return 0
    }
    const playlist = data.result
    console.log(playlist)
    if(playlist.length > 0){
        await db.collection('playlist').add({
             data:[...playlist]
            }).then((res)=>{
                console.log('插入成功')
            }).catch((err)=>{
                consnole.log(err)
                console.log('插入失败')
            })
}
}