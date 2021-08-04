


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQqVg9QQxBajGM1TT17VcPv3NzhDuEZtQ",
  authDomain: "pesa-smart.firebaseapp.com",
  databaseURL: "https://pesa-smart-default-rtdb.firebaseio.com",
  projectId: "pesa-smart",
  storageBucket: "pesa-smart.appspot.com",
  messagingSenderId: "145482444603",
  appId: "1:145482444603:web:7e2016a5c6b2aa367f111e",
  measurementId: "G-6LTQXFYTEY"
};

// cdn
// The core Firebase JS SDK is always required and must be listed first 
<script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"></script>

// TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries
<script src="https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBQqVg9QQxBajGM1TT17VcPv3NzhDuEZtQ",
    authDomain: "pesa-smart.firebaseapp.com",
    databaseURL: "https://pesa-smart-default-rtdb.firebaseio.com",
    projectId: "pesa-smart",
    storageBucket: "pesa-smart.appspot.com",
    messagingSenderId: "145482444603",
    appId: "1:145482444603:web:7e2016a5c6b2aa367f111e",
    measurementId: "G-6LTQXFYTEY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>