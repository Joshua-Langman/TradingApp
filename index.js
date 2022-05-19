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
let Authenticated = false;
let userAccessToken = null;
let userAuthError = false;

app.get("/", (req, res) => {
    res.redirect('/pages/login.html');
})

app.get("/register", (req, res) => {
    res.redirect('pages/register.html')
})

app.get("/chart", (req, res) => {
    if(Authenticated){
        res.redirect('pages/chart.html')
    }else{
        res.redirect('pages/login.html')
    }
})

// User account is:
//username brandons@bbd.co.za
//password testpassword
app.post("/pages/login.html", async (req, res) => {
    const { username, password } = req.body;

    try {
       const authenticationResponse = await firebaseAuth.signInWithEmailAndPassword(auth, username, password);
       Authenticated = true;

       userAccessToken = authenticationResponse.accessToken;

       res.redirect('/pages/chart.html');
    }
    catch(error) {
        userAuthError = true;

        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode , errorMessage);

        res.redirect(`/pages/login.html?errorMessage=${errorMessage}`);
    }
})

app.post("/pages/register.html", async (req, res) => {
    const { username, password } = req.body;

    try {
        const { user, accessToken } = await firebaseAuth.createUserWithEmailAndPassword(auth, username, password);

        Authenticated = true;
        userAccessToken = accessToken;

        res.redirect('/pages/chart.html')
    }
    catch(error) {
        userAuthError = true;

        const { code, message } = error;

        res.redirect(`/pages/register.html?errorMessage=${message}`);
    }
})

app.get('/quote', (req, res) => {
    if(Authenticated){
        res.redirect('/pages/quote.html')
    }else{
        res.redirect('/pages/login.html')
    }
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

app.listen(PORT, () => {
    if(process.env.NODE_ENV !== 'production') {
        console.log(`Web application ready @ http://${HOST}:${PORT}`);
    }
    else {
        console.log(`Web application ready on port: ${PORT}`);
    }
});
