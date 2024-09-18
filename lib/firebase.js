// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {    
    apiKey: "AIzaSyBHm2CxVZGcXm1hFkQ2kgw1XEp0A_bi-YQ",
    authDomain: "mytodolist-ba61d.firebaseapp.com",
    projectId: "mytodolist-ba61d",
    storageBucket: "mytodolist-ba61d.appspot.com",
    messagingSenderId: "650764991713",
    appId: "1:650764991713:web:46fba8a3eb18ae72d90ba0"  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage),});
const db = getFirestore(app);

export {
    auth,
    db
}