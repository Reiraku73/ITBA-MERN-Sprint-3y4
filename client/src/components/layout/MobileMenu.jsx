import { useState } from "react"

export default function MobileMenu({isOpen, onClose}) {


    return (
        <>
            <nav className="header__nav">
                <ul id="primary-menu" className={isOpen ? "nav__list is-open" : "nav__list"}>
                    <li><a onClick={onClose} href="Home.html">Inicio</a></li>
                    <li><a onClick={onClose} href="Productos.html">Productos</a></li>
                    <li><a onClick={onClose} href="Home.html#historia">Nosotros</a></li>
                    <li><a onClick={onClose} href="Contacto.html">Contacto</a></li>
                </ul>
            </nav>
        </>
    )
}