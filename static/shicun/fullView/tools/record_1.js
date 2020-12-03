const fs = require('fs');
fs.readdir("C:/Users/14155/Desktop/fullView/src/img/panorama", function(err,file){
  console.log(file.length/6)
  console.log(err,file)
  fs.open('message.txt', 'a', (err, fd) => {
    if (err) throw err;
    var count = 179
    var json = ""
      file.forEach((path)=>{
        json =json+'"P'+count+'":{"file":"'+path.slice(0,path.length-4)+'","visible":['+(count-1)+','+(count+1)+'],"type":"plain"},'
        count++
      })
    fs.appendFile("C:/Users/14155/Desktop/fullView/src/view.json",json , 'utf8', (err) => {
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      if (err) throw err;
    });
  })
})
