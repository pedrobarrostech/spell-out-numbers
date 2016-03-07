'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _digitsToWord = require('../models/digits-to-word');

var _digitsToWord2 = _interopRequireDefault(_digitsToWord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


var digitsToWord = new _digitsToWord2.default();

router.get('/', function (req, res) {
  res.render("index");
});

router.get('/convert', function (req, res) {
  res.send(JSON.stringify(digitsToWord.spellItOut(req.query.number)));
});

exports.default = router;