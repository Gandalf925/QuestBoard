import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyALYOuWnST4ZQchWJyq85VbLrg7LOw-E2o",
  authDomain: "questboard-ec513.firebaseapp.com",
  projectId: "questboard-ec513",
  storageBucket: "questboard-ec513.appspot.com",
  messagingSenderId: "166240010013",
  appId: "1:166240010013:web:917c97355a7f6d9700ebf4",
  measurementId: "G-BWF4TMFZBK"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)

// export default (context, inject) => {
//   inject('firebase', firebaseApp)
// }
