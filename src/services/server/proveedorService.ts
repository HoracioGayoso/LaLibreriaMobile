import axios from 'axios';
import { SERVER_URL } from '@env';

const API_URL = `${SERVER_URL}/products`;

export const getAllProveedores = async () => {
    try {
      const response = await fetch('http://192.168.1.28:3000/proveedores/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener proveedor:', error);
      throw error;
    }
  };
  