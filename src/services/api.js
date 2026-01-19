import axios from 'axios';

// Base API URL - update this if backend runs on different port
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (userData) => api.post('/signup', { user: userData }),
  login: (credentials) => api.post('/login', { user: credentials }),
  logout: () => api.delete('/logout'),
};

export const booksAPI = {
  getAll: (params) => api.get('/books', { params }),
  getOne: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books', { book: bookData }),
  update: (id, bookData) => api.put(`/books/${id}`, { book: bookData }),
  delete: (id) => api.delete(`/books/${id}`),
};

export const borrowingsAPI = {
  getAll: (params) => api.get('/borrowings', { params }),
  getOne: (id) => api.get(`/borrowings/${id}`),
  create: (bookId) => api.post('/borrowings', { borrowing: { book_id: bookId } }),
  returnBook: (id) => api.patch(`/borrowings/${id}/return_book`),
};

export const dashboardAPI = {
  librarian: () => api.get('/dashboard/librarian'),
  member: () => api.get('/dashboard/member'),
};

export default api;
