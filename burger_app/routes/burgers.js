'use strict';
var burgers = require('express').Router();

// TODO Remove when routes are all implemented
function dummyFunction(req, res){
  res.send(req.method + ' ' + req.path + ' is not implemented');
}

// TODO Remove when db implemented
var burgerData = [
  {id: '1', meat: 'Beef', doneness: 'med', cheese: 'swiss', extras: 'Bacon'},
  {id: '2', meat: 'Angus', doneness: 'med-rare', cheese: null, extras: null},
  {id: '3', meat: 'Beef', doneness: 'med', cheese: 'american', extras: 'pickles'},
  {id: '4', meat: 'Portabello', doneness: 'well', cheese: 'swiss', extras: null}
];


burgers.get('/', listBurgers, function(req, res){
  res.render('pages/list', {burgers: res.data});
});
burgers.get('/new', dummyFunction);
burgers.post('/', addBurger, function(req, res){
  res.redirect('/burgers/'+res.id);
});
burgers.get('/:id/edit', dummyFunction);
burgers.
  route('/:id').
  get(showBurger, function(req, res){
    res.render('pages/show', {burger: res.data});
  }).
  put(editBurger, function(req, res){
    res.redirect(303, '/burgers/'+res.id);
  }).
  delete(deleteBurger, function(req, res){
    res.redirect(303, '/burgers');
  });

function addBurger(req, res, next){
  burgerData.push(req.body);
  res.id = req.body.id;
  next();
}

function showBurger(req, res, next){
  var id = req.params.id;
  var burger = burgerData.filter((el) => el.id === id)[0];
  if(burger) {
    res.data = burger;
    next();
  } else {
    res.sendStatus(404);
  }
}

function listBurgers(req, res, next){
  res.data = burgerData;
  next();
}

function editBurger(req, res, next){
  var id = req.params.id;
  var burgerIndex = -1;
  for(var i = 0; i < burgerData.length; i++){
    if(burgerData[i].id === id){
      burgerIndex = i;
      break;
    }
  }
  if(burgerIndex > -1){
    res.id = id;
    req.body.id = id;
    burgerData[burgerIndex] = req.body;
    next();
  } else {
    res.sendStatus(404);
  }
}

function deleteBurger(req, res, next){
  var id = req.params.id;
  var burgerIndex = -1;
  for(var i = 0; i < burgerData.length; i++){
    if(burgerData[i].id === id){
      burgerIndex = i;
      break;
    }
  }
  if(burgerIndex > -1){
    res.id = id;
    req.body.id = id;
    burgerData.splice(burgerIndex,1);
  }
  next();
}

module.exports = burgers;
