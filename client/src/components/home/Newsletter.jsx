function NewsLetter() {
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Sucripcion enviada");
    };

    return (
        <section className="newsletter" aria-labelledby="newsletter-title">
            <div className="newsletter__content">
                <h2 id="newsletter-title">Sumate a nuestra comunidad</h2>
                <p>
                    Recibí novedades, lanzamientos y descuentos exclusivos directo
                    en tu correo. Sin spam, podés darte de baja cuando quieras.
                </p>
                <form className="newsletter__form" onSubmit={handleSubmit}>
                    <div className="newsletter__field">
                        <label htmlFor="newsletter-email">Correo electrónico</label>
                        <input
                            type="email"
                            id="newsletter-email"
                            name="email"
                            placeholder="tu@email.com"
                            autoComplete="email"
                            required
                            aria-describedby="newsletter-hint"
                        />
                        <p id="newsletter-hint" className="newsletter__hint">
                            Usamos tu correo únicamente para enviarte novedades de Hermanos Jota.
                        </p>
                    </div>

                    <button type="submit" className="btn btn--primary">
                        Suscribirme
                    </button>
                </form>
            </div>
        </section>
    );
}

export default NewsLetter;