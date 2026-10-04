import { useState, useEffect } from 'react'

const CLAVE_USUARIOS = 'usuarios'
const CLAVE_SESION = 'sesion'

function leerStorage(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : valorPorDefecto
  } catch {
    return valorPorDefecto
  }
}

export function useAuth() {
  const [usuarios, setUsuarios] = useState(() => leerStorage(CLAVE_USUARIOS, []))
  const [usuario, setUsuario] = useState(() => leerStorage(CLAVE_SESION, null))

  useEffect(() => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  }, [usuarios])

  useEffect(() => {
    if (usuario) localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
    else localStorage.removeItem(CLAVE_SESION)
  }, [usuario])

  function registrarUsuario(datos) {
    const email = datos.email.trim().toLowerCase()

    if (usuarios.some((u) => u.email === email)) {
      return 'Ese email ya está registrado.'
    }

    setUsuarios((prev) => [...prev, { id: Date.now(), ...datos, email }])
    return null
  }

  function iniciarSesion({ email, password }) {
    const emailNormalizado = email.trim().toLowerCase()
    const encontrado = usuarios.find(
      (u) => u.email === emailNormalizado && u.password === password,
    )

    if (!encontrado) return 'Email o contraseña incorrectos.'

    const { password: _, ...usuarioPublico } = encontrado
    setUsuario(usuarioPublico)
    return null
  }

  function cerrarSesion() {
    setUsuario(null)
  }

  return { usuario, registrarUsuario, iniciarSesion, cerrarSesion }
}