const express = require('express');
const app = express();
const config = require('./config');
const cors = require('cors');

app.use(cors()); //Allows cross origin scripting for our app.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

var authorized = false

app.get("/", (req, res) => {
    res.redirect('/login.html');
})

app.get("/trading", (req, res) => {
    res.redirect('/trading.html');
});

app.listen(config.PORT, () => {
    console.log(`Web application ready @ http://localhost:${config.PORT}`);
});