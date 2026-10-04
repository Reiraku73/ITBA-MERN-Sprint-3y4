import { useState } from 'react'
import { EMAIL_VALIDO } from '../utils/validators.js'

const FORM_VACIO = { nombre: '', email: '', mensaje: '' }

function Contacto() {
  const [form, setForm] = useState(FORM_VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validar(datos) {
    const nuevosErrores = {}

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre.'
    }

    if (!datos.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.'
    } else if (!EMAIL_VALIDO.test(datos.email)) {
      nuevosErrores.email = 'Ese email no parece válido (ej: nombre@mail.com).'
    }

    if (datos.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'Contanos un poco más: al menos 10 caracteres.'
    }

    return nuevosErrores
  }

  function enviar(e) {
    e.preventDefault()

    const erroresEncontrados = validar(form)
    setErrores(erroresEncontrados)
    if (Object.keys(erroresEncontrados).length > 0) return

    console.log('Formulario enviado:', form)
    setForm(FORM_VACIO)
    setEnviado(true)
  }

  return (
    <section className="contacto">

      <div className="contacto__panel">
        <h1>Hablemos</h1>
        <p className="contacto__panel-intro">
          ¿Tenés una consulta sobre nuestros productos, un pedido especial
          o simplemente querés saber más sobre Hermanos Jota? Escribinos,
          te respondemos a la brevedad.
        </p>

        <ul className="contacto__beneficios">
          <li>
            <div>
              <h2>Atención personalizada</h2>
              <p>Te asesoramos para encontrar el mueble ideal para tu espacio.</p>
            </div>
          </li>
          <li>
            <div>
              <h2>Respuesta rápida</h2>
              <p>
                Contestamos en menos de 24hs hábiles, o escribinos directo por{' '}
                <a href="https://wa.me/5491145678900">WhatsApp</a>.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="contacto__form-card">
        {enviado ? (
          <div className="contacto__exito">
            <h2>¡Gracias por escribirnos!</h2>
            <p>Recibimos tu mensaje y te vamos a responder a la brevedad.</p>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setEnviado(false)}
            >
              Enviar otra consulta
            </button>
          </div>
        ) : (
          <>
            <h2 className="contacto__form-title">Envianos tu consulta</h2>
            <form className="contacto__form" onSubmit={enviar} noValidate>
              <div className="form-field">
                <div className="form-field__control">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder=" "
                    value={form.nombre}
                    onChange={cambiar}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                <p className="form-field__error" role="alert">{errores.nombre}</p>
              </div>

              <div className="form-field">
                <div className="form-field__control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={form.email}
                    onChange={cambiar}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                <p className="form-field__error" role="alert">{errores.email}</p>
              </div>

              <div className="form-field">
                <div className="form-field__control">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder=" "
                    value={form.mensaje}
                    onChange={cambiar}
                  ></textarea>
                  <label htmlFor="mensaje">Mensaje</label>
                </div>
                <p className="form-field__error" role="alert">{errores.mensaje}</p>
              </div>

              <button type="submit" className="btn btn--primary contacto__submit">
                Enviar mensaje
              </button>
            </form>
          </>
        )}
      </div>

    </section>
  )
}

export default Contacto
