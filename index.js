import express from 'express';
import cors from 'cors';
import MetaApi from 'metaapi.cloud-sdk';
import path from 'path';
import {fileURLToPath} from 'url';

const port = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); //Allows cross origin scripting for our app.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

app.get("/", (req, res) => {
    res.redirect('/app.html');
})

app.listen(port);


// MetaApi credentials
const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhMGM5OTUyYjk1MWVkZmM1ZGEyNjNmZDA1MWM2NDAzMiIsInBlcm1pc3Npb25zIjpbXSwidG9rZW5JZCI6IjIwMjEwMjEzIiwiaWF0IjoxNjUyMzU3Mzc0LCJyZWFsVXNlcklkIjoiYTBjOTk1MmI5NTFlZGZjNWRhMjYzZmQwNTFjNjQwMzIifQ.EgFlA01FRgyXm7MaKc0WpjrzjPAb6E_yIk7wL9gWmsI7RAmpGRoYRoJGv5CiEYJ4_4J-e_pT07SAvLje28fUspyzcRzqCrUB_JOZkWCbrwdxgSlpXCKB_B6Ly6F9zLBsgIb1t2baPdn9biTtwxzwOmMI3wTA3SDuLy8td9xUS96rRJHvmVs13d2JnI2PzkvnD-SJLnY6fDpf7mKjyu5wLmf56IUwZLxVjsrWg4FnVvpLyHaKSwxm4A70OAedgBIC3GOHNmLXAQj7LwrE7gFcsuTD3h7SGltmOWDiSLWbqDdu3ohcA147inLG0kAgowx0fjMSpu3YdJVmrEPLe_xPULMBNvl4NWlmIzxiAx2mecR49OZQELVjJXKNO62vaKlTlhxeOjlVTcrKlo0QEDxIprJHlMUDq-uSiHrHRZqBDQrhN5VLP7qltgZhh-DIiLNcVZ3uFoV8UkkG9ap9-uRbIwtgs_mo2FLhjXJ1mRTcQ1I7rQhtZBhEQjWnkOlgbABVYkGv0LhUkg5jCvdnC4ZDMWglMJqEy-OvNpLJoeVBTW-shWUpoVrLYPvP1fvNgGdCKDuddmHQFnrfd-pC_jpuS39FCwgUbyGQA5O_-vAB8q8ooTqqRgk8hkGc2wDGNseIuPICiywqO3cKw0BTitKqBbpa7Nqqu_CiFA6IQ4F74T8';
const api = new MetaApi.default(token);
const accountId = "e05a3732-e363-4438-92ad-7ac8ac3d7fc1"

let account = await api.metatraderAccountApi.getAccount(accountId);
let accountAccessToken = account.accessToken;
// console.log(accountAccessToken);

const connection = account.getRPCConnection();

// Retrieves Symbol price from Api and update running array
async function updateUI(connection, priceArray){
    var price = await connection.getSymbolPrice('GBPUSD')
    console.log(price);
    if( priceArray.length > 100){
        priceArray.shift();
        priceArray.push(price);
    }else{
        priceArray.push(price);
    }
}

await connection.connect();
await connection.waitSynchronized();

var priceArray = new Array();

setInterval(() => updateUI(connection, priceArray), 2000)


