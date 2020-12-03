!function () {
  let entryClose = document.getElementsByClassName("entry-close")
  for (let i = 0; i < entryClose.length; i++) {
    let e = entryClose[i];
    e.addEventListener("click", function () {
      this.parentNode.classList.add("hidden")
      if(window.frames.length != parent.frames.length){
        setTimeout(() => {
          this.parentNode.classList.remove("hidden")
          window.parent.document.getElementById("entry").style.visibility = "hidden"
        }, 500);
      }
    })
  }
  let btnCode = document.getElementById("code")
  if(btnCode){
    var code = new securityCode(document.getElementById("code"), 4, "Han Instrument");
    // document.getElementById("verifyCode").pattern=code.createCode();
    code.draw();
    btnCode.addEventListener("click", function(){
      // document.getElementById("verifyCode").pattern=code.createCode();
      code.draw();
    })
  }

  let btnGetCode = document.getElementById("getcode")
  if(btnGetCode){
    btnGetCode.addEventListener("click", function(e){

      e.target.disabled = true
      e.target.style.opacity = 0.5
      e.target.value = 60
  
      let timer = setInterval(() => {

        if(e.target.value == 0){
          e.target.disabled = false
          e.target.style.opacity = 1
          e.target.value = "获 取"
          clearInterval(timer)
          return;
        }
        e.target.value --
  
      }, 1000);
    })
  }
}();