function securityCode(dom, long, fontFamily) {
  this.dom = dom || null
  this.long = long || 4
  this.fontFamily = fontFamily || ""
  this.isReady = false

  let that = this
  let code = ""
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")


  canvas.width = dom.offsetWidth
  canvas.height = dom.offsetHeight
  ctx.font = `${canvas.width/that.long*1.4}px '${that.fontFamily}' `;
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white"

  this.set = function (dom, long) {

    that.dom = dom || null
    that.long = long || 4

  }

  this.draw = function () {

    if (!that.isReady) {
      setTimeout(() => {
        that.draw();
      }, 300);
      return;
    }
    
    let img = getImg();
    that.dom.style.backgroundImage = `url(${img})`

  }

  this.check = function (val) {

    if (val == code) {
      return true
    } else {
      return false
    }

  }

  // 随机字符生成
  this.createCode = function() {
    code = ""
    for (let i = 0; i < that.long; i++) {
      var charCode = Math.random() > 0.5 ? Math.random() * 10 + 48 : Math.random() > 0.5 ? Math.random() * 26 + 97 : Math.random() * 26 + 65
      code += String.fromCodePoint(parseInt(charCode))
    }
    return code
  }

  function getImg() {

    let degree = 0
    let unitW = canvas.width / that.long
    let unitH = canvas.height / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < that.long; i++) {

      ctx.save()
      degree = Math.random() * 20 - 10
      ctx.translate(i * unitW, unitH)
      ctx.rotate(degree * Math.PI / 180)
      ctx.fillText(code[i], 0, 0);
      ctx.restore();

    }


    return canvas.toDataURL()

  }
  if (that.fontFamily) {
    if(!document.fonts){
      that.isReady = true;
      return;
    }
    document.fonts.load(`16px '${that.fontFamily}'`, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
      .then(e => {
        that.isReady = true
      });
  } else {
    that.isReady = true
  }

  this.createCode();

}