import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_bZZ3VtwNBpn7kSJXMPQxVcpd5Op2nLQ",
  authDomain: "learning-firebase-477bf.firebaseapp.com",
  projectId: "learning-firebase-477bf",
  storageBucket: "learning-firebase-477bf.appspot.com",
  messagingSenderId: "482855022588",
  appId: "1:482855022588:web:0d6d6bf151a4da9d9c0c79",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// collection ref

const colRef = collection(db, "street-quotes");

// get docs
// getDocs(colRef).then((snapshot) => {
//   const quotes = [];
//   snapshot.docs.forEach((doc) => {
//     quotes.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(quotes);
// });

// make it a function
function getData() {
  const quotes = [];
  getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        quotes.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return quotes;
}

// hide or show forms

const addBreadcrumb = document.querySelector(".add");
const deleteBreadcrumb = document.querySelector(".delete");
const deleteQuote = document.querySelector(".delete-quote");
const addQuote = document.querySelector(".add-quote");
const addForm = document.querySelector(".add-quote");
const deleteForm = document.querySelector(".delete-quote");

addBreadcrumb.addEventListener("click", (event) => {
  addBreadcrumb.classList.toggle("active");
  if (addBreadcrumb.classList.contains("active")) {
    deleteQuote.classList.add("hide");
    addQuote.classList.remove("hide");
    deleteBreadcrumb.classList.remove("active");
  } else {
    deleteQuote.classList.remove("hide");
    addQuote.classList.add("hide");
  }
});

deleteBreadcrumb.addEventListener("click", (event) => {
  deleteBreadcrumb.classList.toggle("active");
  if (deleteBreadcrumb.classList.contains("active")) {
    deleteQuote.classList.remove("hide");
    addQuote.classList.add("hide");
    addBreadcrumb.classList.remove("active");
  } else {
    deleteQuote.classList.add("hide");
    addQuote.classList.remove("hide");
  }
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());

  console.log(formDataObj);
  addDoc(colRef, formDataObj).then(() => {
    addForm.reset();
  });
});

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObj = Object.fromEntries(formData.entries());
  const docRef = doc(db, "street-quotes", formDataObj.id);
  deleteDoc(docRef).then(() => {
    deleteForm.reset();
    console, log("item deleted");
  });
});
