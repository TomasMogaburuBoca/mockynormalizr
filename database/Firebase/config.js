const admin = require("firebase-admin");
const serviceAccount = require("path/to/serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firebaseDb = firebase.firestore();

module.exports = {firebaseDb, admin};