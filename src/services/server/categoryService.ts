import axios from 'axios';
import { SERVER_URL } from '@env';

const API_URL = `${SERVER_URL}/products`;

export const getAllCategories = async () => {
    try {
      const response = await fetch('http://192.168.1.28:3000/categorias/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener categorias:', error);
      throw error;
    }
  };
  