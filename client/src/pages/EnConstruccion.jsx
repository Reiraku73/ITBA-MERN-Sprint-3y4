import { Link } from 'react-router-dom';

// Pantalla provisoria para las secciones que todavía no tienen página
// (Contacto, Carrito, Cuenta): así el menú no cae en el 404. Cuando cada
// página esté hecha, se cambia el elemento de su <Route> en App.jsx y este
// archivo se puede borrar.
export default function EnConstruccion({ titulo }) {
  return (
    <main>
      <section className="state-message" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1>{titulo}</h1>
        <p>Esta sección todavía está en construcción.</p>
        <Link to="/productos" className="btn btn--primary">
          Ver productos
        </Link>
      </section>
    </main>
  );
}
