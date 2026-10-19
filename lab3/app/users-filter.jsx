import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FilterSheet } from '../components/FilterSheet';
import { DEFAULT_USER_FILTER, useAdmin } from '../context/AdminContext';
import { USER_ROLES, USER_STATUSES } from '../data/seed';

// Панель фільтрації користувачів (presentation: 'formSheet', sheetAllowedDetents)
export default function UsersFilterSheet() {
  const router = useRouter();
  const { userFilter, setUserFilter } = useAdmin();
  const [draft, setDraft] = useState(userFilter);
  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <FilterSheet
      title="Фільтр користувачів"
      query={draft.query}
      onQuery={set('query')}
      queryPlaceholder="Ім'я або email"
      groups={[
        { label: 'Роль', options: ['Усі', ...USER_ROLES], value: draft.role, onChange: set('role') },
        { label: 'Статус', options: ['Усі', ...USER_STATUSES], value: draft.status, onChange: set('status') },
      ]}
      onReset={() => setDraft(DEFAULT_USER_FILTER)}
      onApply={() => {
        setUserFilter(draft);
        router.back();
      }}
    />
  );
}
