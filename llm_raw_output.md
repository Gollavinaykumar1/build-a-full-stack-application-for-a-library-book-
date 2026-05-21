# LLM Output

=== FILE: src/App.jsx ===
import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import BookDetail from './BookDetail';
import AddBook from './AddBook';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import { getBooks, getBook, addBook, borrowBook, returnBook } from './api';
import { BASE_URL } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBook = async (title, author, description) => {
    try {
      const response = await addBook(title, author, description);
      setBooks([...books, response]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBorrowBook = async (bookId) => {
    try {
      await borrowBook(bookId);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      await returnBook(bookId);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HashRouter>
      <div className="max-w-7xl mx-auto p-4">
        <nav className="flex justify-between items-center mb-4">
          <Link to="/" className="text-lg font-bold">
            Library Book Management System
          </Link>
          {user ? (
            <div className="flex justify-end items-center">
              <Link to="/profile" className="mr-4">
                Profile
              </Link>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setUser(null)}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home books={books} />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookDetail
                book={selectedBook}
                onBorrow={handleBorrowBook}
                onReturn={handleReturnBook}
              />
            }
          />
          <Route
            path="/add-book"
            element={
              <AddBook
                onAddBook={handleAddBook}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onRegister={handleRegister}
              />
            }
          />
          <Route path="/profile" element={<Profile user={user} />} />
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

=== FILE: src/index.css ===
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.max-w-7xl {
  max-width: 1600px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.p-4 {
  padding: 1rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: 700;
}

.mr-4 {
  margin-right: 1rem;
}

.bg-red-500 {
  background-color: #dc2626;
}

.hover:bg-red-700 {
  background-color: #b91c1c;
}

.text-white {
  color: #ffffff;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.rounded {
  border-radius: 0.25rem;
}
=== END ===

=== FILE: src/api.js ===
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getBooks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addBook = async (title, author, description) => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, description }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const borrowBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}/borrow`, {
      method: 'POST',
    });
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

const returnBook = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}/return`, {
      method: 'POST',
    });
    await response.json();
  } catch (error) {
    console.error(error);
  }
};

export { getBooks, getBook, addBook, borrowBook, returnBook, BASE_URL };
=== END ===