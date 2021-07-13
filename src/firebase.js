import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVGOr8IviPDhxWtxCIVH3GHz7uVxxU9Gc",
    authDomain: "crud-firebase-vue2.firebaseapp.com",
    projectId: "crud-firebase-vue2",
    storageBucket: "crud-firebase-vue2.appspot.com",
    messagingSenderId: "665272833733",
    appId: "1:665272833733:web:ef50941a782346b60382ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth }