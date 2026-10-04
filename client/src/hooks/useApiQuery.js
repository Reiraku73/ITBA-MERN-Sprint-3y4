import { useCallback, useEffect, useState } from 'react';

/**
 * Pedido de datos al montar un componente (o cuando cambian `deps`) con los
 * tres estados que toda pantalla tiene que contemplar: cargando, error y
 * datos. Cada pedido se cancela con un AbortController cuando cambian las
 * deps o el componente se desmonta, así la respuesta de un pedido viejo no
 * pisa a la de uno nuevo.
 *
 *   const { data, loading, error, reload } = useApiQuery(
 *     (signal) => getProductoById(id, { signal }),
 *     [id]
 *   );
 */
export function useApiQuery(fetcher, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState((prev) => ({ ...prev, loading: false, error }));
      });

    return () => controller.abort();
    // `fetcher` se redefine en cada render: lo que dispara un nuevo pedido
    // son las deps que decide quien llama (y `attempt`, para reintentar).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}
