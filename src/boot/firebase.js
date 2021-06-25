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

  const firebaseConfig2 = {
    apiKey: "AIzaSyCP5X7jvtHZKPcidf040iI5iKQ2r4h5t7M",
    authDomain: "globaltalpakandev.firebaseapp.com",
    databaseURL: "https://globaltalpakandev.firebaseio.com",
    projectId: "globaltalpakandev",
    storageBucket: "globaltalpakandev.appspot.com",
    messagingSenderId: "619989932276",
    appId: "1:619989932276:web:7bfe210e08540ca9a7a6a1",
    measurementId: "G-NDXDMF6S8G"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig2);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.firestore();
let firebaseStorage = firebaseApp.storage();

let secondaryApp = firebase.initializeApp(firebaseConfig2, "secondary");
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