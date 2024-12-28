// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // El reducer de autenticación

// Configura el store usando Redux Toolkit
const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer de autenticación
  },
});

export default store;
