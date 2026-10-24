import { useCallback, useEffect, useState } from 'react';
import { getPokemonDetail } from '../services/pokeApi';

export default function useDetailPokedex(id) {
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState('loading'); // Estados de carga: 'loading' | 'success' | 'error'

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setDetail(await getPokemonDetail(id));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { detail, status, retry: load };
}