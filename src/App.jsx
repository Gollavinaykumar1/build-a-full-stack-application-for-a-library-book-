import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import BookList from './BookList';
import AddBook from './AddBook';
import BorrowBook from './BorrowBook';
import ReturnBook from './ReturnBook';
import Login from './Login';
import Register from './Register';
import {BASE_URL} from './api';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios.get(`${BASE_URL}/books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <HashRouter>
      <div className="container mx-auto p-4 mt-6">
        <nav className="flex justify-between mb-4">
          <Link to="/" className="text-lg font-bold">Library Book Management System</Link>
          {isLoggedIn ? (
            <div className="flex justify-end">
              <Link to="/add-book" className="mr-4">Add Book</Link>
              <Link to="/borrow-book" className="mr-4">Borrow Book</Link>
              <Link to="/return-book" className="mr-4">Return Book</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
          ) : (
            <div className="flex justify-end">
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<BookList books={books} />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/borrow-book" element={<BorrowBook />} />
          <Route path="/return-book" element={<ReturnBook />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;