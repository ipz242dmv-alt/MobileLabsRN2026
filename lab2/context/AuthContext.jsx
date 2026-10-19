import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Глобальний стан авторизації: isAuthenticated + login() / logout()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return { ok: false, error: 'Введіть коректну адресу електронної пошти' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Пароль має містити щонайменше 6 символів' };
    }
    setUser({ email: cleanEmail, name: cleanEmail.split('@')[0] });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth() має викликатися всередині <AuthProvider>');
  return ctx;
}
