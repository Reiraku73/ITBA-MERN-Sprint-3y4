import { productos } from '../data/productos.js'

export function getProductos (req, res) {
    res.status(200).json(productos)
}

export function getProducto(req, res) {
    const { id } = req.params;

    const producto = productos.find((producto) => producto.id === id);
    if (!producto) {
        return res.status(404).json({
            data: null,
            error: { message: "No hay productos con ese ID" },
        });
    }
    res.json({ data: producto, error: null });
}