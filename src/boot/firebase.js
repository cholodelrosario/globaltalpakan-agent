import Vue from 'vue'
import firebase from "firebase";
import VueFirestore from 'vue-firestore'
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyDUxy7GU-yH2_f5CGhPE751uECZSDtDEf4",
    authDomain: "globaltalpakan.firebaseapp.com",
    databaseURL: "https://globaltalpakan.firebaseio.com",
    projectId: "globaltalpakan",
    storageBucket: "globaltalpakan.appspot.com",
    messagingSenderId: "841354857952",
    appId: "1:841354857952:web:d4df6f207dabd8d630af85",
    measurementId: "G-45QMR498D7"
  };

// const firebaseConfig2 = {
//     apiKey: "AIzaSyC09drLNNL0l_gdcX7betbiQOBtoTNtIX4",
//     authDomain: "supernovatestdb.firebaseapp.com",
//     databaseURL: "https://supernovatestdb.firebaseio.com",
//     projectId: "supernovatestdb",
//     storageBucket: "supernovatestdb.appspot.com",
//     messagingSenderId: "478455129849",
//     appId: "1:478455129849:web:3736ba26136a15dccb2428",
//     measurementId: "G-SKFNK7TZ4M"
//   };

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.firestore();
let firebaseStorage = firebaseApp.storage();

let secondaryApp = firebase.initializeApp(firebaseConfig, "secondary");
let Auth2 = secondaryApp.auth();

export {firebase, firebaseAuth, firebaseDb, firebaseStorage, Auth2}

export default async ({ Vue }) => {

    Vue.prototype.$firebase = firebase
    Vue.prototype.$auth = firebaseAuth
    Vue.prototype.$auth2 = Auth2
    Vue.prototype.$db = firebaseDb
    Vue.prototype.$storage = firebaseStorage
    Vue.use(firebase)
    Vue.use(VueFirestore)
    
}