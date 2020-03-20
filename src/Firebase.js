import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAwNfQ1brQHKaRaX1PUU-xsltg4y9K5agw",
    authDomain: "shilingi-c44da.firebaseapp.com",
    databaseURL: "https://shilingi-c44da.firebaseio.com",
    projectId: "shilingi-c44da",
    storageBucket: "shilingi-c44da.appspot.com",
    messagingSenderId: "101833148687",
    appId: "1:101833148687:web:7c514168736236619c967a",
    measurementId: "G-5CE6DKGFB3"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;