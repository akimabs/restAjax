const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

let data = [
	{
		id: 1,
		nama: 'akim',
		nim: 238
	}
];
let currentId = 2;

app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {
		judul: 'Home'
	});
});

app.get('/app', (req, res) => {
	res.render('app', {
		judul: 'Ajax app'
	});
});

app.get('/data', (req, res) => {
	res.send({ data: data });
});

app.post('/data', (req, res) => {
	let dataName = req.body.name;
	let dataNim = req.body.nim;

	currentId++;

	data.push({
		id: currentId,
		nama: dataName,
		nim: dataNim
	});

	res.send('successfully create data');
});
// gaskeun
