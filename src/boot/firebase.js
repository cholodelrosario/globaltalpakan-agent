import Vue from 'vue'
import firebase from "firebase";
import VueFirestore from 'vue-firestore'
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyAhs7ndb6l74OAZcIjDkgVtxzfht7kO5KU",
    authDomain: "supernova-powdercoating.firebaseapp.com",
    databaseURL: "https://supernova-powdercoating.firebaseio.com",
    projectId: "supernova-powdercoating",
    storageBucket: "supernova-powdercoating.appspot.com",
    messagingSenderId: "648341644915",
    appId: "1:648341644915:web:36ec3a032ac9f7bb7b2c06",
    measurementId: "G-J1GG7TNM29"
};

const firebaseConfig2 = {
    apiKey: "AIzaSyC09drLNNL0l_gdcX7betbiQOBtoTNtIX4",
    authDomain: "supernovatestdb.firebaseapp.com",
    databaseURL: "https://supernovatestdb.firebaseio.com",
    projectId: "supernovatestdb",
    storageBucket: "supernovatestdb.appspot.com",
    messagingSenderId: "478455129849",
    appId: "1:478455129849:web:3736ba26136a15dccb2428",
    measurementId: "G-SKFNK7TZ4M"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.firestore();
let firebaseStorage = firebaseApp.storage();

let secondaryApp = firebase.initializeApp(firebaseConfig, "secondary");
let Auth2 = secondaryApp.auth();

export {firebase, firebaseAuth, firebaseDb, firebaseStorage}

export default async ({ Vue }) => {

    Vue.prototype.$firebase = firebase
    Vue.prototype.$auth = firebaseAuth
    Vue.prototype.$auth2 = Auth2
    Vue.prototype.$db = firebaseDb
    Vue.prototype.$storage = firebaseStorage
    Vue.use(firebase)
    Vue.use(VueFirestore)
    
}