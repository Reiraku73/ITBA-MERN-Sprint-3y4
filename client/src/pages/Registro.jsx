import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FORM_VACIO = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  password: '',
  confirmacion: '',
}

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEFONO_VALIDO = /^[0-9+\s()-]{6,}$/

function Register({ onRegistrar }) {
  const [form, setForm] = useState(FORM_VACIO)
  const [errores, setErrores] = useState({})
  const navigate = useNavigate()

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validar(datos) {
    const nuevosErrores = {}

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre.'
    }

    if (!datos.apellido.trim()) {
      nuevosErrores.apellido = 'Ingresá tu apellido.'
    }

    if (!datos.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.'
    } else if (!EMAIL_VALIDO.test(datos.email)) {
      nuevosErrores.email = 'Ese email no parece válido (ej: nombre@mail.com).'
    }

    // El teléfono es opcional: solo lo revisamos si escribieron algo.
    if (datos.telefono.trim() && !TELEFONO_VALIDO.test(datos.telefono)) {
      nuevosErrores.telefono = 'Ese teléfono no parece válido.'
    }

    if (datos.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.'
    }

    if (!datos.confirmacion) {
      nuevosErrores.confirmacion = 'Repetí tu contraseña.'
    } else if (datos.confirmacion !== datos.password) {
      nuevosErrores.confirmacion = 'Las contraseñas no coinciden.'
    }

    return nuevosErrores
  }

  function enviar(e) {
    e.preventDefault()

    const erroresEncontrados = validar(form)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    // La confirmación solo sirve para validar, no se guarda.
    const { confirmacion, ...datos } = form
    const mensaje = onRegistrar(datos)

    if (mensaje) {
      // Por ahora el único error posible es que el email ya exista.
      setErrores({ email: mensaje })
      return
    }

    navigate('/login')
  }

  return (
    <section className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Crear cuenta</h1>

        <form className="auth__form" onSubmit={enviar} noValidate>
          <div className="cuenta__row">
            <div className="form-field form-field--float">
              <div className="form-field__control">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  autoComplete="given-name"
                  placeholder=" "
                  value={form.nombre}
                  onChange={cambiar}
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
              <p className="form-field__error" role="alert">{errores.nombre}</p>
            </div>

            <div className="form-field form-field--float">
              <div className="form-field__control">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  autoComplete="family-name"
                  placeholder=" "
                  value={form.apellido}
                  onChange={cambiar}
                />
                <label htmlFor="apellido">Apellido</label>
              </div>
              <p className="form-field__error" role="alert">{errores.apellido}</p>
            </div>
          </div>

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
                type="tel"
                id="telefono"
                name="telefono"
                autoComplete="tel"
                placeholder=" "
                value={form.telefono}
                onChange={cambiar}
              />
              <label htmlFor="telefono">Teléfono (opcional)</label>
            </div>
            <p className="form-field__error" role="alert">{errores.telefono}</p>
          </div>

          <div className="form-field form-field--float">
            <div className="form-field__control">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder=" "
                value={form.password}
                onChange={cambiar}
              />
              <label htmlFor="password">Contraseña</label>
            </div>
            <p className="form-field__error" role="alert">{errores.password}</p>
          </div>

          <div className="form-field form-field--float">
            <div className="form-field__control">
              <input
                type="password"
                id="confirmacion"
                name="confirmacion"
                autoComplete="new-password"
                placeholder=" "
                value={form.confirmacion}
                onChange={cambiar}
              />
              <label htmlFor="confirmacion">Repetir contraseña</label>
            </div>
            <p className="form-field__error" role="alert">{errores.confirmacion}</p>
          </div>

          <button type="submit" className="btn btn--primary auth__submit">
            Crear cuenta
          </button>
        </form>

        <p className="auth__extra">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </section>
  )
}

export default Register