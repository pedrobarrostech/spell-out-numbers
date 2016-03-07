import express from 'express';
import path from 'path';
import routes from './routes/main.routes';

const app = express();

app.set('views', path.join(__dirname, 'views/ejs'));
app.set('view engine', 'ejs');
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.use('/', routes);

const server = app.listen(3000, () => {
	const {address, port} = server.address();
	console.log('Example app listening at http:${address}:${port}');
});
