const express = require("express");
const bodyParser = require("body-parser");
const web3 = require("web3");

const app = express();
const PORT = process.env.PORT || 3000;

const Web3 = new web3(process.env.PROVIDER || web3.givenProvider);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('*', function(req, res){
    let splits = req.path.split('/').filter(e => ( e !== '' ));
    if (splits.length < 1) {
        res.status(404).send('No such method');
	return;
    }

    let scope = Web3;
    for (let i = 0; i < splits.length - 1; i++ ) {
        scope = scope[splits[i]];
    }
    let method = splits[splits.length - 1];

    if (typeof scope[method] !== 'function') {
        res.status(404).send('No such method');
	return;
    }

    let params = req.body.params;
    if (!Array.isArray(params)) {
        res.status(400).send('No params provided');
	return;
    }

    try {
        let result = scope[method](...params);
	res.json({ result });
    } catch (err) {
	console.log(err);
        res.status(400).send(err.message);
    }
});


app.listen(PORT, function() {
    console.log('Web3 server started on port', PORT);
});

