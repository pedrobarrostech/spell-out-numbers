'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _main = require('./routes/main.routes');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('views', _path2.default.join(__dirname, 'views/ejs'));
app.set('view engine', 'ejs');
app.use('/scripts', _express2.default.static(__dirname + '/node_modules/'));

app.use('/', _main2.default);

var server = app.listen(3000, function () {
	var _server$address = server.address();

	var address = _server$address.address;
	var port = _server$address.port;

	console.log('Example app listening at http:${address}:${port}');
});