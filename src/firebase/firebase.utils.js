import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAzg_qUaJfPA3yXbuynZ-14kxrs3FS8MfE",
  authDomain: "crown-db-f9f54.firebaseapp.com",
  databaseURL: "https://crown-db-f9f54.firebaseio.com",
  projectId: "crown-db-f9f54",
  storageBucket: "crown-db-f9f54.appspot.com",
  messagingSenderId: "408630615720",
  appId: "1:408630615720:web:3bbc8d399c57653a64ec9d",
  measurementId: "G-FZKJP95TQ6",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
