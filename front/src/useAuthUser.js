import { useEffect, useState } from 'react';

export default function useAuthUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8001/api/me', {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setUser(data || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}