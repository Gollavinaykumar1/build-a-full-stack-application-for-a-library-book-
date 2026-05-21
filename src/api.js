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

// Auto-generated missing exports by VIA
export const createItem = async (data) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/item`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!r.ok) throw new Error('createItem failed');
  return r.json();
};
export const deleteItem = async (id) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/item/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('deleteItem failed');
  return r.json();
};
export const getItems = async () => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/items`);
  if (!r.ok) throw new Error('getItems failed');
  return r.json();
};
export const getStats = async () => {
  const r = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/stats`);
  if (!r.ok) throw new Error('getStats failed');
  return r.json();
};
