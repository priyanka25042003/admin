import firebase from "firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//// set your config hear
  //   apiKey:,
  // authDomain: ,
  // databaseURL:
  //  ,
  // projectId:,
  // storageBucket:,
  // messagingSenderId:,
  // appId:,
};

export const app = firebase.initializeApp(firebaseConfig);

export default firebase;
