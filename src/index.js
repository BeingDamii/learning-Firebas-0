import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

const env = require("./env.js");

const firebaseConfig = {
  apiKey: env.APIKEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

// init firebase
const app = initializeApp(firebaseConfig);

// init firestore
const db = getFirestore(app);

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

// realtime collection data

// onSnapshot(colRef, (snapshot) => {
//   const quotes = [];
//   snapshot.docs.forEach((doc) => {
//     quotes.push({ ...doc.data(), id: doc.id });
//   });
//   console.log(quotes);
// });

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

// create new  quote with get docs

// const quoteWrapper = document.querySelector(".quotes");
// getDocs(colRef).then((snapshot) => {
//   const quotes = [];
//   snapshot.docs.forEach((doc) => {
//     quotes.push({ ...doc.data(), id: doc.id });
//   });
//   quotes.forEach((obj) => {
//     const newQuote = `
//     <div class="quote">
//     <h1 class="quote-heading">${obj.Quote}</h1>
//     <p class="quote-meaning">${obj.Meaning}</p>
//   </div>
//     `;
//     quoteWrapper.innerHTML += newQuote;
//   });
// });

const quoteWrapper = document.querySelector(".quotes");
onSnapshot(colRef, (snapshot) => {
  const quotes = [];
  snapshot.docs.forEach((doc) => {
    quotes.push({ ...doc.data(), id: doc.id });
  });
  quotes.forEach((obj) => {
    const newQuote = `
    <div class="quote">
    <h1 class="quote-heading">${obj.Quote}</h1>
    <p class="quote-meaning">${obj.Meaning}</p>
  </div>
    `;
    quoteWrapper.innerHTML += newQuote;
  });
});
