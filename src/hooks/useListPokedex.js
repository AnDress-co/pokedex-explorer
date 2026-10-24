import { useCallback, useEffect, useRef, useState } from 'react';
import { getPokemonPage, PAGE_SIZE } from '../services/pokeApi';

export default function useListPokedex() {
    // CONCEPTO: useState - Estados de la interfaz (carga / error / éxito)
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('loading');
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadMoreFailed, setLoadMoreFailed] = useState(false);

    const offsetRef = useRef(0);
    const busyRef = useRef(false);
    const hasMoreRef = useRef(true);

    const loadMore = useCallback(async () => {
        if (busyRef.current || !hasMoreRef.current) return;
        busyRef.current = true;
        const isFirstPage = offsetRef.current === 0;
        if (!isFirstPage) setLoadingMore(true);
        try {
            const page = await getPokemonPage(offsetRef.current);
            setItems((prev) => [...prev, ...page.results]);
            offsetRef.current += PAGE_SIZE;
            hasMoreRef.current = page.hasMore;
            setStatus('success');
        } catch (error) {
            if (isFirstPage) setStatus('error');
            else setLoadMoreFailed(true);
        } finally {
            busyRef.current = false;
            setLoadingMore(false);
        }
    }, []);

    // CONCEPTO: useEffect con una dependencia estable -> se ejecuta una vez al montar el componente
    useEffect(() => {
        loadMore();
    }, [loadMore]);

    const retry = useCallback(() => {
        setLoadMoreFailed(false);
        if (offsetRef.current === 0) setStatus('loading');
        loadMore();
    }, [loadMore]);

    return { items, status, loadingMore, loadMoreFailed, loadMore, retry };
}
