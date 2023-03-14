import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEwaTaX6ppY5zxSrYhIH_38O-o-6pDq-A",
  authDomain: "crwn-clothing-v2-63885.firebaseapp.com",
  projectId: "crwn-clothing-v2-63885",
  storageBucket: "crwn-clothing-v2-63885.appspot.com",
  messagingSenderId: "248915096527",
  appId: "1:248915096527:web:3708954b8d1ef2857718ba",
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Initializing auth for authentication and db for firestore database.
export const auth = getAuth();
export const db = getFirestore();

// Set up functions for signing in with Google via popup or redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Set up a function for adding a collection of objects to the database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey); // Get a reference to the collection
  const batch = writeBatch(db); // Create a batch object for efficient writes to the database

  // Iterate over each object to add to the collection
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // Get a reference to the document in the collection
    batch.set(docRef, object); // Add the object to the batch object
  });

  await batch.commit(); // Commit the batch object to the database
};

// Set up a function for getting all the documents in a collection
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories"); // Get a reference to the "categories" collection
  const q = query(collectionRef); // Create a query object to get all the documents in the collection

  const querySnapshot = await getDocs(q); // Execute the query and get a snapshot of the documents
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data()); // Return an array of the data objects for each document
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
