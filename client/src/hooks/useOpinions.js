import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3001/api/opiniones'

export function useOpinions() {
  const [opiniones, setOpiniones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const fetchOpiniones = async () => {
    try {
      setCargando(true)
      setError(null)
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Error al cargar las opiniones')
      setOpiniones(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    fetchOpiniones()
  }, [])

  return { opiniones, cargando, error, reintentar: fetchOpiniones }
}