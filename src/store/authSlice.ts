// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define el estado inicial del slice
interface AuthState {
  user: any | null;
}

const initialState: AuthState = {
  user: null,
};

// Crea el slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Acción para establecer el usuario autenticado
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    // Acción para borrar el usuario (logout)
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Exporta las acciones generadas por createSlice
export const { setUser, clearUser } = authSlice.actions;

// Exporta el reducer generado por createSlice
export default authSlice.reducer;
