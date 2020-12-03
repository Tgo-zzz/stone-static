const express = require('express');
const app = express();
const bodypaser = require('body-parser')
const session = require('express-session')
const router = express.Router()
const fs = require('fs');

let user = JSON.parse(fs.readFileSync(__dirname + '/static/data/user.json').toString())
let questions = JSON.parse(fs.readFileSync(__dirname + '/static/data/questions.json').toString())
let answers = JSON.parse(fs.readFileSync(__dirname + '/static/data/answers.json').toString())
console.log("用户列表：" + JSON.stringify(user))

// 半个小时无操作，session消失
app.use(session({
  secret: 'keyboard cat', //值可以随便取
  resave: true,
  name: "stone",
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  rolling: true //只要页面由刷新，session值就会被保存，如果为false则只要半小时以后不管有没有操作，session都会消失
}));

app.use(bodypaser.urlencoded({
  extended: false
}))
app.use(bodypaser.json())
app.use(express.static(__dirname + '/static'));



router.get('/user', (req, res) => {

  if (req.session && req.session.username) {
    res.send({
      code: 1,
      data: user[req.session.username]
    })
  } else {
    res.send({
      code: -1,
      mes: "未登录"
    })
  }
})

router.get('/login', (req, res) => { //设置session

  if (req.query.phoneNumber) {

    let user = getUser("phoneNumber", req.query.phoneNumber)

    req.session.username = user;
    console.log(req.session)

    res.send({
      code: "1",
      mes: "登陆成功"
    })

  } else {
    res.send({
      code: "-1",
      mes: "登陆失败"
    })
  }

});

router.post('/record/question', (req, res) => {
  let question = ""
  req.on("data", function (data) {
    question += data.toString()
  })
  req.on("end", function () {
    question = JSON.parse(question)
    question.user = user[getUser("name", req.session.username)]
    question.time = new Date().getTime()
    console.log("问题是：", question)
    questions.unshift(question)
    fs.writeFile(__dirname + '/static/data/questions.json', JSON.stringify(questions), error => {
      if (error) {
        console.log("写入文件失败,原因是" + error.message);
        res.send({
          code: "-1",
          mes: "问题写入失败"
        })
      }
      console.log("问题写入成功");
      res.send({
        code: "1",
        mes: "问题写入成功"
      })
    });
  })
})

router.post('/record/answer', (req, res) => {
  let answer = ""
  req.on("data", function (data) {
    answer += data.toString()
  })
  req.on("end", function () {
    answer = JSON.parse(answer)
    answer.user = user[getUser("name", req.session.username)]
    answer.time = new Date().getTime()
    console.log("回答：", answer)
    if (!answers[req.query.order]) {
      answers[req.query.order] = []
    }
    answers[req.query.order].unshift(answer)
    fs.writeFile(__dirname + '/static/data/answers.json', JSON.stringify(answers), error => {
      if (error) {
        console.log("写入文件失败,原因是" + error.message);
        res.send({
          code: "-1",
          mes: "问题写入失败"
        })
      }
      console.log("问题写入成功");
      res.send({
        code: "1",
        mes: "问题写入成功"
      })
    });
  })
})

router.post('/record/minecraft', (req, res) => {
  let map = ""
  req.on("data", function (data) {
    map += data.toString()
  })
  req.on("end", function () {
    let time = new Date().getTime()
    fs.writeFile(`${__dirname}/static/data/minecraft/${req.session.username}_${time}.json`, map, error => {
      if (error) {
        console.log("保存地图失败,原因是" + error.message);
        res.send({
          code: -1,
          mes: "地图保存失败"
        })
      } else {
        let client = user[getUser("name", req.session.username)]
        if (!client.map){
          client.map = {}
        } 
        client.map.model = time
        fs.writeFile(__dirname + "/static/data/user.json", JSON.stringify(user), error => {
          if (error) return console.log("用户地图保存失败")
          res.send({
            code: 1,
            mes: "地图保存成功"
          })
        })
      }
    })
  })
})

router.post('/record/minecraftMap', (req, res) => {
  let map = ""
  req.on("data", function (data) {
    map += data.toString()
  })
  req.on("end", function () {
    let time = new Date().getTime()
    fs.writeFile(`${__dirname}/static/data/minecraft/${req.session.username}_${time}_map.json`, map, error => {
      if (error) {
        console.log("保存地图失败,原因是" + error.message);
        res.send({
          code: -1,
          mes: "地图保存失败"
        })
      } else {
        let client = user[getUser("name", req.session.username)]
        if (!client.map) {
          client.map = {}
        } 
        client.map.bit = time
        fs.writeFile(__dirname + "/static/data/user.json", JSON.stringify(user), error => {
          if (error) return console.log("用户地图保存失败")
          res.send({
            code: 1,
            mes: "地图保存成功"
          })
        })
      }
    })
  })
})

router.get("/forum/getQuestions", (req, res) => {
  fs.readFile(__dirname + '/static/data/questions.json', "utf-8", (error, data) => {
    if (error) {
      console.log("读取文件失败,原因是" + error.message);
      res.send({
        code: -1,
        mes: "读取失败"
      })
      return;
    }
    res.send({
      code: 1,
      data
    })
  })
})
router.get("/forum/getAnswers", (req, res) => {
  fs.readFile(__dirname + '/static/data/answers.json', "utf-8", (error, answersText) => {
    if (error) {
      console.log("读取文件失败,原因是" + error.message);
      res.send({
        code: -1,
        mes: "读取失败"
      })
      return;
    }
    if (req.query.order) {
      let answers = JSON.parse(answersText)
      return res.send({
        code: 1,
        data: answers[req.query.order],
        question: getQuestion(req.query.order)
      })
    }
    res.redirect("/shicun/forum/forum.html")
  })
})

router.get("/minecraft", (req, res) => {
  let maps = fs.readdirSync(__dirname + "/static/data/minecraft")
  let username = req.session.username
  let modelNum = user[getUser("name", username)].map.model
  let bitMapNum = user[getUser("name", username)].map.bit
  let data = {}
  if(!modelNum || !bitMapNum ){
    return res.send({
      code:-1,
      mes:"无地图记录"
    })
  }
  maps.forEach(e => {
    if(e.indexOf(username) != -1){
      if(e.indexOf(modelNum)!=-1){
        data.model = 'http://localhost:3160/data/minecraft/'+e
      }
      if(e.indexOf(bitMapNum)!=-1){
        data.bitMap = fs.readFileSync(__dirname + '/static/data/minecraft/'+e).toString()
      }
    }
  });
  res.send({
    code:1,
    data
  })
})

app.use(router)

app.listen(3160, () => {
  console.log("server start")
})


function getUser(key, value) {
  for (let e in user) {
    if (user[e][key] == value) {
      return e
    }
  }
  return false
}

function getQuestion(time) {
  let question
  questions.forEach(e => {
    if (e.time == time) {
      question = e
    }
  });
  return question
}