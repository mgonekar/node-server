const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `time is ${now} : ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unable to append to server.log');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintanance.hbs')
});

app.use(express.static(__dirname+ '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome :)'
  });
  // res.send({
  //   name:'asd',
  //   likes: ['biking','horsing','ridding']
  // });
});

app.get('/about', (req,res) => {
//  res.send('This is about');
res.render('about.hbs',{
  pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'This is error.'
  });
});
app.listen(3000);
