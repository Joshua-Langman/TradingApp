const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors()); //Allows cross origin scripting for our app.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

app.get("/", (req, res) => {
    res.redirect('/app.html');
})

app.listen(port);