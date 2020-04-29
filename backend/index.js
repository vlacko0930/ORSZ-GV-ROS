const express = require('express')
const app = express()
const port = 3000
var server = app.listen(port, () => console.log(`Alkalmazás elindítva a ${port} porton!`));
var io = require('socket.io')(server);

var helmet = require('helmet');
app.use(helmet())

var jatekok= [];
const betuk = ['A,Á','Á,A','B','C','CS','D','E,É','É,E','F','G','GY','H','I,Í','Í,I','J','K','L,LY','LY,L','M','N','NY','O,Ó','Ó,O','Ő,Ö','Ö,Ő','P','R','S','SZ','T','TY','U,Ú',"Ú,U","Ü,Ű",'Ű,Ü','V,W',"Z,ZS"]
var cors = require('cors');
app.use(cors({origin:['http://localhost:8080'],
    methods:['GET','POST', 'DELETE', 'PUT'],credentials: true}));

var morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.static(__dirname+'/public/'));
app.get(/.*/, (req,res) => res.sendFile(__dirname+'/public/index.html'))

io.on('connection', (socket) => {
  console.log("Felhasználó kapcsolódott",socket.id)
  socket.on('ujjatek', function(nev) {
    var jatekid=Math.floor(Math.random() * 1001);
    while(jatekok[jatekid]){
      jatekid=Math.floor(Math.random()*1001);
    }
    jatekok[jatekid] = {
      jatekosok: []
    }
    jatekok[jatekid].jatekosok.push({jatekok: [], id: socket.id, nev: nev, allapot: 0})
    socket.emit('jatekid',jatekid)
    socket.join(jatekid);
    io.to(jatekid).emit('jatekosvaltozas',{irany: 1, jatekos: {id: socket.id, nev: nev}})
  })
  socket.on('csatlakozasjatekhoz',(adatok) => {
    if(jatekok[adatok.id]){
      socket.emit('jatekosok',jatekok[adatok.id].jatekosok)
      jatekok[adatok.id].jatekosok.push({jatekok: [], id: socket.id, nev: adatok.nev, allapot: 0})
      socket.emit('jatekid',adatok.id)
      socket.join(adatok.id);
      io.to(adatok.id).emit('jatekosvaltozas',{irany: 1, jatekos: {id: socket.id, nev: adatok.nev}})
    }
  })
  socket.on('indithato',jatekid => {
    jatekok[jatekid].jatekosok.find(j=> j.id==socket.id).allapot=1
    if(jatekok[jatekid].jatekosok.findIndex(j=> j.allapot==0)==-1){
      jatekok[jatekid].betu=betuk[Math.floor(Math.random() * betuk.length)]
      io.to(jatekid).emit('start',jatekok[jatekid].betu)
      jatekok[jatekid].jatekosok.forEach(j => j.allapot=0);
    }
  })
  socket.on("stop",(jatekid) => {
    io.to(jatekid).emit('stop');
  })
  socket.on("vegallas",szavak => {
    io.to(szavak.jatekid).emit('jatekosszavai',{...szavak, jatekos: jatekok[szavak.jatekid].jatekosok.find(j=> j.id==socket.id).nev})
  })
  socket.on("pont",(p) =>{
    io.to(p.jatekid).emit('jatekospontja',{id: socket.id, pont: p.pont})
  })
  socket.on('disconnect', () => {
    console.log("Lecsatlakozott",socket.id)
    jatekok.forEach((jatek,i) => {
      const jatekosid=jatek.jatekosok.findIndex(j => j.id==socket.id);
      if(jatekosid>-1){
        io.to(i).emit('jatekosvaltozas',{irany: -1, jatekos: socket.id})
        jatek.jatekosok.splice(jatekosid,1)
      }
      if(jatek.jatekosok.length==0){
        delete jatekok[i]
      }
    })
  })
})
