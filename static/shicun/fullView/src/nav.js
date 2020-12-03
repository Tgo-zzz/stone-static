let navshow = true
let mapshow = false
let bgmshow = false

$(window).click(function(){
  $("#bgm").ready(function(){
    document.getElementById("bgm").volume = 0.2
    document.getElementById("bgm").play()
  })
  $(window).unbind("click");
})
$("#menu").focus(function(){
  controls.enabled = false
})
$("#menu").blur(function(){
  controls.enabled = true
})
$("#btn-photo").click(function () {
  let canvas = document.getElementsByTagName("canvas")[0]
  dataURL = canvas.toDataURL("image/png");
  let a = document.createElement('a')
  a.download = "全景" + new Date().getTime()
  a.href = dataURL
  a.dispatchEvent(new MouseEvent('click'))
})
$("#btn-map").click(function () {
  mapshow = !mapshow
  mapshow ? $("#map").show("normal") : $("#map").hide("normal")
  console.log(camera.position)
})
$("#btn-nav").click(function () {
  navshow = !navshow
  navshow ? $("#nav").show("normal") : $("#nav").hide("normal")
})
$("#btn-music").click(function () {
  bgmshow = !bgmshow
  bgmshow ? $("#bgm").show("normal") : $("#bgm").hide("normal")
})

function nav() {
  this.centerPosition = 0
  this.order = [0,1,2,3,4,5,6]
  this.vessels = $("#pathway > li")
  this.center = 3
  this.views = []
}
nav.prototype = {
  init: function (views, center) {

    this.views = views;
    this.centerPosition = window.innerHeight / 2 + 110
    if (center) this.center = center;

    for(let i = this.center-3;i<this.center+4;i++){
    
      $(this.vessels[i]).css({"backgroundImage":`url('./src/img/labs/${i+1}.png')`})
      $(this.vessels[i]).attr("title",`${this.views[i].name}`)
      this.vessels[i].myindex = i

    }

    this.vessels.each((i,e)=>{
      e.addEventListener("click",(e)=>{
        var lab = ViewData.label[e.target.myindex]
        fullView.set( lab.NUMBER , lab.direction, true)
        switch (e.target.myindex) {
          case this.center:break;
          case this.center-1: this.pre();
          case this.center+1: this.next();
        }
      })
    })

    $("#nav_btn1").on("click", () => {
      this.next()
    })
    $("#nav_btn2").on("click", () => {
      this.pre()
    })

    let i = 6
    let append = setInterval(() => {
      
      $(this.vessels[i]).css({
        "transform": `translateY(${this.centerPosition + (180+60)*(-3+i--)}px)`
      });
      if (i == -1) {
        clearInterval(append)
      };
    }, 300);

  },
  next: function () {

    if (this.center == this.views.length-1) {
      alert("没有了哦~")
      return;
    }
    let i = this.order.shift()
    this.order.push(i)
    this.center ++;
    this.change();
    this.order.forEach((e,index)=>{
      this.vessels[e].style.transform = `translateY(${this.centerPosition + (180+60)*(-3+index)}px)`
    })

  },
  pre: function () {

    if (this.center == 0) {
      alert("没有了哦~")
      return;
    }
    let j = this.order.pop()
    this.order.unshift(j)
    this.center --;
    this.change();
    this.order.forEach((e,index)=>{
      this.vessels[e].style.transform = `translateY(${this.centerPosition + (180+60)*(-3+index)}px)`
    })

  },
  change: function(){
    var vessels = this.vessels
    var order = this.order
    vessels[order[6]].myindex = vessels[order[5]].myindex+1
    if(vessels[order[6]].myindex<this.views.length){
      $(vessels[order[6]]).css({"backgroundImage":`url('./src/img/labs/${vessels[order[6]].myindex+1}.png')`,"opacity":"0"})
      $(vessels[order[6]]).attr("title",`${this.views[vessels[order[6]].myindex].name}`)
    }else{
      $(vessels[order[6]]).css({"backgroundImage":""})
      $(vessels[order[6]]).attr("title","")
    }
    vessels[order[0]].myindex = vessels[order[1]].myindex-1
    if(vessels[order[0]].myindex>=0){
      $(vessels[order[0]]).css({"backgroundImage":`url('./src/img/labs/${vessels[order[0]].myindex+1}.png')`,"opacity":"0"})
      $(vessels[order[0]]).attr("title",`${this.views[vessels[order[0]].myindex].name}`)
    }else{
      $(vessels[order[0]]).css({"backgroundImage":""})
      $(vessels[order[0]]).attr("title","")
    }
    vessels[order[2]].style.opacity = "1"
    vessels[order[4]].style.opacity = "1"
  }
}

var navtion = new nav();

navtion.init(ViewData.label)