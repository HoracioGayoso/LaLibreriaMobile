// Formatea un número como precio con separador de miles, coma decimal y símbolo '$'
// Ej: 1234.56 → "$1.234,56"
export function formatPrice(value) {
  const num = typeof value === 'number' ? value : parseFloat(value.replace(',', '.'));
  if (isNaN(num)) return '';
  return (
    '$' +
    num
      .toFixed(2) // dos decimales
      .replace('.', ',') // coma como separador decimal
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // puntos como separadores de miles
  );
}

// Quita el formato del precio y lo convierte a número
// Ej: "$1.234,56" → 1234.56
export function unformatPrice(formattedValue) {
  const numericValue = formattedValue
    .replace(/[^0-9,,-]/g, '') // elimina todo excepto números, coma y guión
    .replace(/\./g, '') // elimina puntos de miles
    .replace(',', '.'); // cambia coma decimal a punto

  return parseFloat(numericValue);
}

// Agrega '%' al final de un valor numérico
// Ej: 25 → "25%"
export function formatMargin(value) {
  if (value === '' || value === null || value === undefined) return '';
  return value + '%';
}

// Elimina el símbolo '%' del valor
// Ej: "25%" → "25"
export function unformatMargin(value) {
  return value.replace('%', '').trim();
}
