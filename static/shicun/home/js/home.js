let sideBtn = document.getElementsByClassName("btn-side")[0]
let sideNav = document.getElementsByClassName("stone-side")[0]
let navTimer = 10

if (sideBtn)
  sideBtn.addEventListener("click", function (e) {

    let ele = {}

    if (e.target.nodeName != "BUTTON") {
      ele = e.target.parentNode
    } else {
      ele = e.target
    }
    if (ele.classList[1] == "unfold") {
      sideNav.style.transform = `translateX(${ele.parentNode.offsetWidth - 72}px)`
      ele.classList.remove("unfold")
      ele.classList.add("fewer")
      navTimer = 30
    } else {
      sideNav.style.transform = ""
      ele.classList.remove("fewer")
      ele.classList.add("unfold")
      navTimer = -1
    }

  }, false)

if (document.getElementById("menu")) {

  document.getElementById("menu").addEventListener('click', function (e) {

    e.target.style.visibility = 'hidden'
    sideNav.style.transform = `translateX(${sideNav.offsetWidth - 72 }px)`

    setInterval(() => {

      if (navTimer == -1) return;
      if (navTimer == 0) {

        sideNav.style.transform = `translateX(${sideNav.offsetWidth }px)`
        document.getElementById("menu").style.visibility = 'visible'

      }
      navTimer--

    }, 1000);

  })

}

if (window.client) {
  console.log(window.client)
  document.getElementById("user").innerText = window.client.name;
  document.getElementById("user").href = "../user/user.html"
} else {
  document.getElementById("user").href = "#"
  document.getElementById("user").addEventListener("click", function () {
    document.getElementById("entry").style.visibility = "visible"
  })
}