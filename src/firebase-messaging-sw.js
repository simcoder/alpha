importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
   apiKey: "AIzaSyCaSGKwMcKSoNnbCsF98Ery7i1Fim0lkgc",
    authDomain: "property-management-advisor.firebaseapp.com",
    databaseURL: "https://property-management-advisor.firebaseio.com",
    projectId: "property-management-advisor",
    storageBucket: "",
    messagingSenderId: "949522077085",
    appId: "1:949522077085:web:f0f7f484fc258464"
}
firebase.initializeApp(config);

const messaging = firebase.messaging();