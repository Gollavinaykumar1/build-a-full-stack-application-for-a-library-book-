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

// Auto-generated missing exports by VIA
export const BASE_URL = async (...args) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/base_url`);
  if (!r.ok) throw new Error('BASE_URL failed');
  return r.json();
};
