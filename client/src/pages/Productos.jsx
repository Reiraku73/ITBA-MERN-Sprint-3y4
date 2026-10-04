import ProductGrid from '../components/products/ProductGrid';

export default function Productos({ onAgregar }) {
    return (
        <main>
            <ProductGrid onAgregar={onAgregar} />
        </main>
    )
}