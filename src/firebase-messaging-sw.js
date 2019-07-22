importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
const config = require('firebase.config.js');

firebase.initializeApp(config.firebase);

const messaging = firebase.messaging();