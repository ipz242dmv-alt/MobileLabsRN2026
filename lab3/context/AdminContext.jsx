import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { createSeedLogs, createSeedNews, createSeedUsers, LOG_TYPES } from '../data/seed';
import { student } from '../constants/theme';

const AdminContext = createContext(null);

export const DEFAULT_NEWS_FILTER = { query: '', status: 'Усі', category: 'Усі' };
export const DEFAULT_USER_FILTER = { query: '', role: 'Усі', status: 'Усі' };

const ADMIN_CREDENTIALS = { email: 'admin@ztu.edu.ua', password: 'admin123' };

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  // Локальні масиви об'єктів — "база даних" прототипу
  const [news, setNews] = useState(createSeedNews);
  const [users, setUsers] = useState(createSeedUsers);
  const [logs, setLogs] = useState(createSeedLogs);
  const [newsFilter, setNewsFilter] = useState(DEFAULT_NEWS_FILTER);
  const [userFilter, setUserFilter] = useState(DEFAULT_USER_FILTER);
  const seq = useRef(1000);

  const nextId = () => String(++seq.current);

  // Новий запис у журнал додається лише для шести системних подій (LOG_TYPES)
  const addLog = useCallback((type, details, actor) => {
    if (!LOG_TYPES[type]) return;
    setLogs((prev) => [
      { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, details, actor, createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const login = useCallback(
    (email, password) => {
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
        return { ok: false, error: 'Невірна пошта або пароль' };
      }
      setAdmin({ name: student.fullName, email: cleanEmail, role: 'Адміністратор' });
      addLog('LOGIN', cleanEmail, cleanEmail);
      return { ok: true };
    },
    [addLog]
  );

  const logout = useCallback(() => {
    if (admin) addLog('LOGOUT', admin.email, admin.email);
    setAdmin(null);
  }, [admin, addLog]);

  const createNews = useCallback(
    (data) => {
      const item = { ...data, id: nextId(), createdAt: new Date().toISOString() };
      setNews((prev) => [item, ...prev]);
      addLog('NEWS_CREATE', `«${item.title}»`, admin?.email);
      return item;
    },
    [admin, addLog]
  );

  const updateNews = useCallback(
    (id, data) => {
      setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...data } : n)));
      addLog('NEWS_UPDATE', `«${data.title}»`, admin?.email);
    },
    [admin, addLog]
  );

  const deleteNews = useCallback(
    (id) => {
      const item = news.find((n) => n.id === id);
      setNews((prev) => prev.filter((n) => n.id !== id));
      if (item) addLog('NEWS_DELETE', `«${item.title}»`, admin?.email);
    },
    [news, admin, addLog]
  );

  const toggleUserStatus = useCallback(
    (id) => {
      const user = users.find((u) => u.id === id);
      if (!user) return;
      const status = user.status === 'Активний' ? 'Заблокований' : 'Активний';
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
      addLog('USER_STATUS', `${user.name} → ${status}`, admin?.email);
    },
    [users, admin, addLog]
  );

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: admin !== null,
      login,
      logout,
      news,
      users,
      logs,
      createNews,
      updateNews,
      deleteNews,
      toggleUserStatus,
      newsFilter,
      setNewsFilter,
      userFilter,
      setUserFilter,
    }),
    [admin, login, logout, news, users, logs, createNews, updateNews, deleteNews, toggleUserStatus, newsFilter, userFilter]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin() має викликатися всередині <AdminProvider>');
  return ctx;
}

export function filterNews(news, f) {
  const q = f.query.trim().toLowerCase();
  return news.filter(
    (n) =>
      (f.status === 'Усі' || n.status === f.status) &&
      (f.category === 'Усі' || n.category === f.category) &&
      (!q || n.title.toLowerCase().includes(q))
  );
}

export function filterUsers(users, f) {
  const q = f.query.trim().toLowerCase();
  return users.filter(
    (u) =>
      (f.role === 'Усі' || u.role === f.role) &&
      (f.status === 'Усі' || u.status === f.status) &&
      (!q || u.name.toLowerCase().includes(q) || u.email.includes(q))
  );
}
