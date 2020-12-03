const express = require('express');
const app = express();
const bodypaser = require('body-parser')
const router = express.Router()
const fs = require('fs');
app.use(express.static(__dirname + '/static'));
app.use(bodypaser.urlencoded({extended: false}))
// app.use(bodypaser.json())

//路由
router.post('/record',(req,res)=>{
  var view = req.body
  console.log(view)
// fs.writeFile("C:/Users/14155/Desktop/fullView/tools/static/view.json", view, error => {
//   if (error) return console.log("写入文件失败,原因是" + error.message);
//   console.log("写入成功");
//   res.send({
//     code:"1"
//   })
// });
res.send(JSON.stringify(req))
})
app.use(router)
app.listen(3160,()=>{
  console.log("server start")
})