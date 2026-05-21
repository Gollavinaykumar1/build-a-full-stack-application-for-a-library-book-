# LLM Output

=== FILE: src/App.jsx ===
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
=== END ===

=== FILE: src/main.jsx ===
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

nav {
  @apply bg-gray-200;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  @apply text-gray-600;
  margin-right: 1rem;
}

nav a:hover {
  @apply text-gray-800;
}

button {
  @apply bg-blue-500;
  @apply hover:bg-blue-700;
  @apply text-white;
  @apply font-bold;
  @apply py-2;
  @apply px-4;
  @apply rounded;
}
=== END ===

=== FILE: src/api.js ===
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addBook = async (book) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const borrowBook = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}/borrow`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const returnBook = async (bookId) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${bookId}/return`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
=== END ===