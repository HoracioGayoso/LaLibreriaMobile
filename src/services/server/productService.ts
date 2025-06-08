import axios from 'axios';
import { SERVER_URL } from '@env';

const API_URL = `${SERVER_URL}/products`;

export const getAllProducts = async () => {
    try {
      const response = await fetch('http://192.168.1.28:3000/productos/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  };
  