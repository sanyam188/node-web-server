const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

const port = process.env.PORT || 3000;

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${ req.url}`;
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
    console.log('Unable to write to file');}
  });
  console.log(log);
  next();
});

app.use((req,res,next)=>{
  res.render('maintainence.hbs');
  next();
})

hbs.registerPartials(__dirname+'/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{

  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  // //res.send('<h1>Hello express</h1>');
  // res.send({
  //   name:'sanyam',
  //   gender:'male',
  //   age:20
  // })
  res.render('home.hbs',{
    title:'Home Page',
    //year:'2019',
    year:new Date().getFullYear(),
    userName:'Sanyam Jain'
  })
});

app.get('/about',(req,res)=>{
  // res.send('<h1>About:::</h1>');
  // res.send({
  //   name:'sanyam',
  //   gender:'male',
  //   age:20
  // })
  res.render('about.hbs',{
    title:'View wngine',
    //year:'2019',
    year:new Date().getFullYear(),
    userName:'Sanyam188'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    name:'sanyam',
    professtion:'coder'
  })
})

app.listen(port ,()=>{
  console.log('Server is up 8080');
});
