'use strict';
var burgers = require('express').Router();

// TODO Remove when routes are all implemented
function dummyFunction(req, res){
  res.send(req.method + ' ' + req.path + ' is not implemented');
}


burgers.get('/', dummyFunction);
burgers.get('/new', dummyFunction);
burgers.post('/', dummyFunction);
burgers.get('/:id/edit', dummyFunction);
burgers.
  route('/:id').
  get(dummyFunction).
  put(dummyFunction).
  delete(dummyFunction);

module.exports = burgers;
