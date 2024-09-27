import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NewsGrid from './components/NewsGrid';
import SavedArticles from './components/SavedArticles';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Initialize Firebase (you'll need to add your Firebase config here)
const firebaseConfig = {
  // Add your Firebase configuration here
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  ,
  authDomain: "iyar-app.firebaseapp.com",
  projectId: "iyar-app",
  storageBucket: "iyar-app.appspot.com",
  messagingSenderId: "434584677355",
  appId: "1:434584677355:web:dd5b69d5340386912787ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const fetchSavedArticles = async () => {
    const savedArticlesCollection = collection(db, 'savedArticles');
    const savedArticlesSnapshot = await getDocs(savedArticlesCollection);
    const savedArticlesList = savedArticlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSavedArticles(savedArticlesList);
  };

  const saveArticle = async (article) => {
    try {
      const docRef = await addDoc(collection(db, 'savedArticles'), article);
      setSavedArticles([...savedArticles, { id: docRef.id, ...article }]);
    } catch (error) {
      console.error('Error saving article: ', error);
    }
  };

  const removeArticle = async (articleId) => {
    try {
      await deleteDoc(doc(db, 'savedArticles', articleId));
      setSavedArticles(savedArticles.filter(article => article.id !== articleId));
    } catch (error) {
      console.error('Error removing article: ', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>News for Indian Immigrants in Italy</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/saved">Saved Articles</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<NewsGrid saveArticle={saveArticle} />} />
            <Route path="/saved" element={<SavedArticles savedArticles={savedArticles} removeArticle={removeArticle} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}