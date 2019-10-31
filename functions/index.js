const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

const uuidv5 = require('uuid/v5');



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  next();
});

app.use(cors());
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// POST / method
app.post("/", (request, response) => {
    const entry = request.body;

    return admin.database().ref('/entries').push(entry)
        .then(() => {
            return response.status(200).send(entry)
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        });
});


const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
const keyGen = uuidv5('Get_Key', MY_NAMESPACE); 
exports.dbCreate = functions.database.ref('/entries/{id}').onCreate(
(snapshot, context) => {
    const createdData = snapshot.val();
    const newData = {
      key : keyGen,
    };
    return snapshot.ref.update(newData);
});

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.entries = functions.https.onRequest(app);












// // GET / method
// app.get("/", (request, response) => {
//     return admin.database().ref('/entries').on("value", snapshot => {
//         return response.status(200).send(snapshot.val());
//     }, error => {
//         console.error(error);
//         return response.status(500).send('Oh no! Error: ' + error);
//     });
// });

    

