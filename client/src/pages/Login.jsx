import { useState } from 'react'
import { Link } from 'react-router-dom'

const FORM_VACIO = { email: '', password: '' }
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login({ onLogin }) {
  const [form, setForm] = useState(FORM_VACIO)
  const [errores, setErrores] = useState({})

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validar(datos) {
    const nuevosErrores = {}

    if (!datos.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.'
    } else if (!EMAIL_VALIDO.test(datos.email)) {
      nuevosErrores.email = 'Ese email no parece válido (ej: nombre@mail.com).'
    }

    if (!datos.password) {
      nuevosErrores.password = 'Ingresá tu contraseña.'
    }

    return nuevosErrores
  }

  function enviar(e) {
    e.preventDefault()

    const erroresEncontrados = validar(form)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    const mensaje = onLogin(form)
    if (mensaje) {
      setErrores({ general: mensaje })
    }
  }

  return (
    <section className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Iniciar sesión</h1>

        <form className="auth__form" onSubmit={enviar} noValidate>
          <div className="form-field form-field--float">
            <div className="form-field__control">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder=" "
                value={form.email}
                onChange={cambiar}
              />
              <label htmlFor="email">Email</label>
            </div>
            <p className="form-field__error" role="alert">{errores.email}</p>
          </div>

          <div className="form-field form-field--float">
            <div className="form-field__control">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder=" "
                value={form.password}
                onChange={cambiar}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <p className="form-field__error" role="alert">{errores.password}</p>
          </div>

          {errores.general && (
            <p className="form-field__error" role="alert">{errores.general}</p>
          )}

          <button type="submit" className="btn btn--primary auth__submit">
            Entrar
          </button>
        </form>

        <p className="auth__extra">
          ¿No tenés cuenta aún? <Link to="/register">Creá una</Link>
        </p>
      </div>
    </section>
  )
}

export default Login