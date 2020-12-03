var req = new XMLHttpRequest()
req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {

    var res = JSON.parse(req.responseText);
    if(res.code == 1){
      window.client = res.data
    }

  }
}
req.withCredentials = true;
req.open('get', `http://localhost:3160/user`,false);
req.send(null);