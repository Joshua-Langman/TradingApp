const express = require('express');
const firebase = require('firebase/app')
const firebaseAuth = require('firebase/auth')
const bodyParser = require('body-parser')
const { request } = require('express');
const { PORT, HOST } = require('./config');
const cors = require('cors');
const https = require('https');
const axios = require('axios');

const app = express();

app.use(cors()); //Allows cross origin scripting for our app.
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Firebase configs
const firebaseConfig = {
    apiKey: "AIzaSyBQdWs3_rUFHvUlqoKIuJxeLwwTXo3MMuM",
    authDomain: "bbdtradingwebapp.firebaseapp.com",
    projectId: "bbdtradingwebapp",
    storageBucket: "bbdtradingwebapp.appspot.com",
    messagingSenderId: "271540953336",
    appId: "1:271540953336:web:b80e5cfba92eeff0069b0d",
    measurementId: "G-MR4L0F47NW"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseAuth.getAuth();

// User auth variables
var authorized = false;
var userAccessToken = null;
var userAuthError = false;

app.get("/", (req, res) => {
    res.redirect('/pages/login.html');
})

app.get("/trading", (req, res) => {
    if(authorized){
        res.redirect('pages/trading.html');
    }else{
        res.redirect('pages/login.html');
    }
    
})

app.get("/register", (req, res) => {
    res.redirect('pages/register.html')
})

app.get("/chart", (req, res) => {
    res.redirect('pages/chart.html')
})

// User account is:
//username brandons@bbd.co.za
//password testpassword
app.post("/pages/login.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.signInWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            var user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/pages/chart.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/pages/loginError.html')
        })
})

app.post("/pages/loginError.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.signInWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            var user = userCredentials.user;
            Authenticated = true;
            userAccessToken = user.accessToken;
            res.redirect('/pages/chart.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/pages/loginError.html')
        })
})

app.post("/pages/register.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.createUserWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            const user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/pages/chart.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/pages/registerError.html')
        })
})

app.post("/pages/registerError.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.createUserWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            const user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/pages/chart.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/pages/registerError.html')
        })
})

app.get('/quote', (req, res) => {
    res.redirect('/pages/quote.html')
})

// Retrieve market pairs from cryptowatch
app.get("/market/pairs", (request, response) => {
    axios.get('https://api.cryptowat.ch/markets/luno')
    .then(res => {
        console.log(res.data.result)
        var pairs = res.data.result.map((item) => {
            return item.pair;
        })
        response.send(pairs)
    })
    .catch(error => {
        console.log(error.message);
    });
})

var pairs = new Object();

function pushToPairs(key, value){
    pairs[key] = value
    // console.log(pairs)
}

// Retrieve market prices from cryptowatch
app.get("/market/prices", (request, response) => {
    axios.get('https://api.cryptowat.ch/markets/luno')
    .then(res => {
        // console.log(res.data.result)
        let pairSymbols = res.data.result.map((item) => {
            return item.pair;
        })
        // console.log(pairSymbols)

        const getPairs = new Promise((resolve, reject) => {
            for (let symbol of pairSymbols) {
                axios.get("https://api.cryptowat.ch/markets/luno/" + symbol + "/price")
                .then(res => {
                    pushToPairs(symbol, res.data.result.price);
                })
                .catch(error => {
                    reject(error.message)
                });
            }
            resolve(pairs)
        })

        getPairs.then(res => {
            console.log(res)
            response.send(res)
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log("market pairs request failed")
        // console.log(Object.keys(error));
        console.log(error.message)
    });   
})

app.get("/market/candles", (request, response) => {

    const baseUrl="https://api.cryptowat.ch/markets/";
    const exchange=request.query.exchange;
    const pair=request.query.pair;
    const after=request.query.after;
    const periods=request.query.periods;

    axios.get(`${baseUrl}${exchange}/${pair}/ohlc?after=${after}&periods=${periods}`)
    .then(res => {
        response.send(res.data.result);
    })
    .catch(error => {
        console.log("candles request failed")
        // console.log(Object.keys(error));
        console.log(error.message)
    });   
});

app.listen(PORT, hostname='0.0.0.0', () => {
    console.log(`Web application ready @ http://0.0.0.0:${PORT}`);
});
