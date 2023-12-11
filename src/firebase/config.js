import firebase  from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDjjUonBwgPNGiqKMMz842Xxa-rF-mjhlE",
    authDomain: "projectmanagement-2.firebaseapp.com",
    projectId: "projectmanagement-2",
    storageBucket: "projectmanagement-2.appspot.com",
    messagingSenderId: "292851402840",
    appId: "1:292851402840:web:11fdfb556bed51a528e22d"
  };
  firebase.initializeApp(firebaseConfig)
  const projectFiretore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.Timestamp
  export {projectFiretore,projectAuth,timestamp}