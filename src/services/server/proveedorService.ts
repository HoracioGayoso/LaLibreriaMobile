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
  export const createProveedor = async (newProveedor: any) => {
    try {
      const response = await fetch('http://192.168.1.28:3000/proveedores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProveedor)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const createdProveedor = await response.json();
      return createdProveedor;
  
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      throw error;
    }
  };