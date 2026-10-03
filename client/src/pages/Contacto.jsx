import { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: conectar con el backend (services/api) cuando esté el endpoint de contacto
    console.log('Formulario enviado:', formData);
    setEnviado(true);
  };

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
            <form className="contacto__form" onSubmit={handleSubmit}>
              <div className="form-field">
                <div className="form-field__control">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder=" "
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                <p className="form-field__error"></p>
              </div>

              <div className="form-field">
                <div className="form-field__control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                <p className="form-field__error"></p>
              </div>

              <div className="form-field">
                <div className="form-field__control">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder=" "
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="mensaje">Mensaje</label>
                </div>
                <p className="form-field__error"></p>
              </div>

              <button type="submit" className="btn btn--primary contacto__submit">
                Enviar mensaje
              </button>
            </form>
          </>
        )}
      </div>

    </section>
  );
}

export default Contacto;