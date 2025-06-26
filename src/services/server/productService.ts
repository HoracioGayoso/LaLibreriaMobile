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
  export const updateProduct = async (codigo_barra: string, updateProduct: any) => {
    try {
      const response = await fetch(`http://192.168.1.28:3000/productos/${codigo_barra}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar producto: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en updateProduct:', error);
      throw error;
    }
  };
  export const createProduct = async (newProduct: any) => {
    try {
      const response = await fetch(`http://192.168.1.28:3000/productos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear producto: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en createProduct:', error);
      throw error;
    }
  };