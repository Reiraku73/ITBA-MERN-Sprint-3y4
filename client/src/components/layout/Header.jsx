import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';



export default function Header({ cantidadCarrito = 0 }) {
  const [busqueda, setBusqueda] = useState("")
  const [state, setState] = useState(false)

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault()

    const busquedaTemplate = `/productos?q=${busqueda}`
    navigate(busquedaTemplate)

    setBusqueda("")
  }

  function handleNavigate() {
    setState(false)
  }

  return (
    <header className="site-header">
      <div className="header__logo">
        <a href="Home.html" className="header__logo-link">
          <img
            src="/images/branding/isotipo.png"
            alt=""
            width="34"
            height="41"
          />
          <span className="header__wordmark">Hermanos Jota</span>
        </a>
      </div>

      <MobileMenu isOpen={state} onClose={handleNavigate} />
      <form className="header__search" role="search" onSubmit={handleSubmit}>
        <label htmlFor="search-input" className="visually-hidden">Buscar productos</label>
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          type="search"
          id="search-input"
          placeholder="Buscar muebles..."
        />
        <button type="submit">
          <img src="images/icons/search.svg" alt="" width="20" height="20" />
        </button>
      </form>
      <div className="header__actions">
        <button
          type="button"
          className="nav__toggle"
          aria-expanded={state}
          aria-controls="primary-menu"
          aria-label="Abrir menú de navegación"
          onClick={() => setState((prev) => !prev)}
        >
          <span aria-hidden="true" >☰</span>
        </button>

        <a href="Cuenta.html" className="header__icon-link">
          <img src="images/icons/user.svg" alt="" width="24" height="24" />
        </a>

        <a href="Carrito.html" className="header__icon-link header__cart">
          <img src="images/icons/cart.svg" alt="" width="24" height="24" />
          <span className="cart-count">{cantidadCarrito}</span>
        </a>
      </div>
    </header>
  );
}