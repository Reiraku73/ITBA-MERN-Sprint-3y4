import { useState, useEffect } from 'react';


const API_URL = 'http://localhost:3001/api/productos';

// Hook para traer TODOS los productos
export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al cargar el catálogo');
      
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return { productos, cargando, error, reintentar: fetchProductos };
}

// Hook 2 para traer un solo producto
export function useProducto(id) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducto = async () => {
    if (!id) return;
    try {
      setCargando(true);
      setError(null);
      const res = await fetch(`${API_URL}/${id}`);
      
      const json = await res.json();
      
      // { data: producto, error: null o mensaje }
      if (!res.ok || json.error) {
        throw new Error(json.error?.message || 'Error al cargar el producto');
      }
      
      setProducto(json.data); 
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, [id]);

  return { producto, cargando, error, reintentar: fetchProducto };
}