  import firebase from 'firebase'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA0gbdOIfJ9nU8Z9M7maNhLAfqhIzd2Qiw",
    authDomain: "clone-messenger-6fe5b.firebaseapp.com",
    databaseURL: "https://clone-messenger-6fe5b-default-rtdb.firebaseio.com",
    projectId: "clone-messenger-6fe5b",
    storageBucket: "clone-messenger-6fe5b.appspot.com",
    messagingSenderId: "776110735495",
    appId: "1:776110735495:web:240fdc967cc0f31bb97822"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore()

  export default db