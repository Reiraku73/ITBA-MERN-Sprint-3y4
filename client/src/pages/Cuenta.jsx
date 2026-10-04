import { useState } from 'react'

const TELEFONO_VALIDO = /^[0-9+\s()-]{6,}$/

function formDesdeUsuario(usuario) {
  return {
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    telefono: usuario.telefono || '',
    passwordActual: '',
    passwordNueva: '',
    confirmacion: '',
  }
}

function Cuenta({ usuario, onActualizar, onLogout }) {
  const [form, setForm] = useState(() => formDesdeUsuario(usuario))
  const [errores, setErrores] = useState({})
  const [editando, setEditando] = useState(false)
  const [exito, setExito] = useState(false)

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function empezarEdicion() {
    setExito(false)
    setEditando(true)
  }

  function cancelar() {
    setForm(formDesdeUsuario(usuario))
    setErrores({})
    setEditando(false)
  }

  function validar(datos) {
    const nuevosErrores = {}

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre.'
    }

    if (!datos.apellido.trim()) {
      nuevosErrores.apellido = 'Ingresá tu apellido.'
    }

    if (datos.telefono.trim() && !TELEFONO_VALIDO.test(datos.telefono)) {
      nuevosErrores.telefono = 'Ese teléfono no parece válido.'
    }

    const cambiandoPassword =
      datos.passwordActual || datos.passwordNueva || datos.confirmacion

    if (cambiandoPassword) {
      if (!datos.passwordActual) {
        nuevosErrores.passwordActual = 'Ingresá tu contraseña actual.'
      }

      if (datos.passwordNueva.length < 6) {
        nuevosErrores.passwordNueva = 'La contraseña debe tener al menos 6 caracteres.'
      }

      if (!datos.confirmacion) {
        nuevosErrores.confirmacion = 'Repetí la nueva contraseña.'
      } else if (datos.confirmacion !== datos.passwordNueva) {
        nuevosErrores.confirmacion = 'Las contraseñas no coinciden.'
      }
    }

    return nuevosErrores
  }

  function enviar(e) {
    e.preventDefault()

    const erroresEncontrados = validar(form)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    const datos = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim(),
      passwordActual: form.passwordActual,
      passwordNueva: form.passwordNueva,
    }

    const mensaje = onActualizar(datos)
    if (mensaje) {
      setErrores({ passwordActual: mensaje })
      return
    }

    setForm({
      ...form,
      nombre: datos.nombre,
      apellido: datos.apellido,
      telefono: datos.telefono,
      passwordActual: '',
      passwordNueva: '',
      confirmacion: '',
    })
    setEditando(false)
    setExito(true)
  }

  return (
    <section className="cuenta">
      <h1>Mi cuenta</h1>
      <p className="cuenta__intro">
        Estos son tus datos personales. Podés editarlos cuando quieras.
      </p>

      {exito && (
        <p className="cuenta__exito" role="status">
          Los datos se actualizaron correctamente.
        </p>
      )}

      <form className="cuenta__form" onSubmit={enviar} noValidate>
        <div className="cuenta__row">
          <div className="form-field form-field--float">
            <div className="form-field__control">
              <input
                type="text"
                id="nombre"
                name="nombre"
                autoComplete="given-name"
                placeholder=" "
                readOnly={!editando}
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
                readOnly={!editando}
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
              autoComplete="email"
              placeholder=" "
              readOnly
              disabled
              value={usuario.email}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>

        <div className="form-field form-field--float">
          <div className="form-field__control">
            <input
              type="tel"
              id="telefono"
              name="telefono"
              autoComplete="tel"
              placeholder=" "
              readOnly={!editando}
              value={form.telefono}
              onChange={cambiar}
            />
            <label htmlFor="telefono">Teléfono</label>
          </div>
          <p className="form-field__error" role="alert">{errores.telefono}</p>
        </div>

        {editando && (
          <fieldset className="cuenta__password">
            <legend>Cambiar contraseña (opcional)</legend>

            <div className="form-field form-field--float">
              <div className="form-field__control">
                <input
                  type="password"
                  id="passwordActual"
                  name="passwordActual"
                  autoComplete="current-password"
                  placeholder=" "
                  value={form.passwordActual}
                  onChange={cambiar}
                />
                <label htmlFor="passwordActual">Contraseña actual</label>
              </div>
              <p className="form-field__error" role="alert">{errores.passwordActual}</p>
            </div>

            <div className="cuenta__row">
              <div className="form-field form-field--float">
                <div className="form-field__control">
                  <input
                    type="password"
                    id="passwordNueva"
                    name="passwordNueva"
                    autoComplete="new-password"
                    placeholder=" "
                    value={form.passwordNueva}
                    onChange={cambiar}
                  />
                  <label htmlFor="passwordNueva">Nueva contraseña</label>
                </div>
                <p className="form-field__error" role="alert">{errores.passwordNueva}</p>
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
                  <label htmlFor="confirmacion">Repetir nueva contraseña</label>
                </div>
                <p className="form-field__error" role="alert">{errores.confirmacion}</p>
              </div>
            </div>
          </fieldset>
        )}

        <div className="cuenta__botones">
          {editando ? (
            <div className="cuenta__acciones">
              <button type="submit" className="btn btn--primary">
                Guardar cambios
              </button>
              <button type="button" className="btn btn--secondary" onClick={cancelar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn--secondary" onClick={empezarEdicion}>
              Editar datos
            </button>
          )}

          <button
            type="button"
            className="btn btn--secondary cuenta__logout"
            onClick={onLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </form>
    </section>
  )
}

export default Cuenta