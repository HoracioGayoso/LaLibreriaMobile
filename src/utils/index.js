export function formatPrice(value) {
    return value
      .toFixed(2) // Aseguramos dos decimales
      .replace('.', ',') // Reemplazamos el punto decimal por coma
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Añadimos puntos como separadores de miles
      .replace(/^/, '$'); // Añadimos el símbolo de moneda al inicio
  }
export function unformatPrice(formattedValue) {
    // Eliminar el símbolo de moneda y los puntos como separadores de miles
    const numericValue = formattedValue
      .replace('₱', '')           // Elimina el símbolo de la moneda (puedes ajustarlo dependiendo del símbolo)
      .replace(/\./g, '')         // Elimina los puntos (separadores de miles)
      .replace(',', '.');         // Reemplaza la coma decimal por punto
  
    // Convertir el string resultante en un número
    return parseFloat(numericValue);
}

// Función para formatear el margen agregando el símbolo '%'
export const formatMargin = (value) => {
    if (value === '') return '';
    return `${value}%`;
  };
  
  // Función para quitar el símbolo '%' del margen
  export const unformatMargin = (value) => {
    return value.replace('%', '').trim();
  };
  