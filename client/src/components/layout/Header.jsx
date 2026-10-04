import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import CartIcon from '../cart/CartIcon';



export default function Header() {
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
        <NavLink to="/" className="header__logo-link">
          <img
            src="/images/branding/isotipo.png"
            alt=""
            width="34"
            height="41"
          />
          <span className="header__wordmark">Hermanos Jota</span>
        </NavLink>
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
          <img src="/icons/search.svg" alt="" width="20" height="20" />
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

        <NavLink to="/cuenta" className="header__icon-link">
          <img src="/icons/user.svg" alt="" width="24" height="24" />
        </NavLink>

        <CartIcon />
      </div>
    </header>
  );
}