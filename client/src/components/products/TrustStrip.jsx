import { LeafIcon, ReturnIcon, ShieldCheckIcon, TruckIcon } from '../ui/Icons';

const ITEMS = [
  { icon: <TruckIcon />, title: 'Envíos a todo el país', text: 'Tu próximo favorito, a tu puerta' },
  { icon: <LeafIcon />, title: 'Materiales nobles', text: 'Madera y detalles que perduran' },
  { icon: <ShieldCheckIcon />, title: 'Compra segura', text: 'Tus datos siempre protegidos' },
  { icon: <ReturnIcon />, title: 'Cambios y devoluciones', text: 'Comprá con tranquilidad' },
];

export default function TrustStrip() {
  return (
    <ul className="trust-strip" aria-label="Beneficios de comprar en Hermanos Jota">
      {ITEMS.map((item) => (
        <li key={item.title} className="trust-strip__item">
          <span className="trust-strip__icon">{item.icon}</span>
          <span>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
