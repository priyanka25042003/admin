import firebase from "firebase";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjdBef7YjTT_1JxkIX34okuy0Ly-6pfC0",
  authDomain: "tour-and-travel-agency-3eb3a.firebaseapp.com",
  databaseURL:
    "https://tour-and-travel-agency-3eb3a-default-rtdb.firebaseio.com",
  projectId: "tour-and-travel-agency-3eb3a",
  storageBucket: "tour-and-travel-agency-3eb3a.appspot.com",
  messagingSenderId: "698063399359",
  appId: "1:698063399359:web:8758504db66b59df2d590a",
};

export const app = firebase.initializeApp(firebaseConfig);

export default firebase;
