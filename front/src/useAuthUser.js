import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Nueva función para refrescar el usuario manualmente
  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/me`, {
        credentials: 'include'
      });
      const data = res.ok ? await res.json() : null;
      setUser(data || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line
  }, []);

  return { user, loading, setUser, refreshUser };
}