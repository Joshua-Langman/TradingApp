const express = require('express');
const app = express();
const firebase = require('firebase/app')
const firebaseAuth = require('firebase/auth')
const bodyParser = require('body-parser')
const cors = require('cors');
const { request } = require('express');
const port = 8080;

app.use(cors()); //Allows cross origin scripting for our app.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

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
    res.redirect('/login.html');
})

app.get("/trading", (req, res) => {
    if(authorized){
        res.redirect('/trading.html');
    }else{
        res.redirect('/login.html');
    }
    
})

app.get("/register", (req, res) => {
    res.redirect('/register.html')
})

// User account is:
//username brandons@bbd.co.za
//password testpassword
app.post("/login.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.signInWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            var user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/trading.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/loginError.html')
        })
})

app.post("/loginError.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.signInWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            var user = userCredentials.user;
            Authenticated = true;
            userAccessToken = user.accessToken;
            res.redirect('/trading.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/loginError.html')
        })
})

app.post("/register.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.createUserWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            const user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/trading.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/registerError.html')
        })
})

app.post("/registerError.html", (req, res) => {
    console.log(req.body);

    firebaseAuth.createUserWithEmailAndPassword(auth, req.body.username, req.body.password)
        .then((userCredentials) => {
            //signed in
            Authenticated = true;
            const user = userCredentials.user;
            userAccessToken = user.accessToken;
            res.redirect('/trading.html')
        })
        .catch((error) => {
            userAuthError = true;
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode , errorMessage);
            res.redirect('/registerError.html')
        })
})

app.listen(port);
