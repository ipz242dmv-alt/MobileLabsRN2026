import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FilterSheet } from '../components/FilterSheet';
import { DEFAULT_NEWS_FILTER, useAdmin } from '../context/AdminContext';
import { NEWS_CATEGORIES, NEWS_STATUSES } from '../data/seed';

// Панель фільтрації новин (presentation: 'formSheet', sheetAllowedDetents)
export default function NewsFilterSheet() {
  const router = useRouter();
  const { newsFilter, setNewsFilter } = useAdmin();
  const [draft, setDraft] = useState(newsFilter);
  const set = (key) => (value) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <FilterSheet
      title="Фільтр новин"
      query={draft.query}
      onQuery={set('query')}
      queryPlaceholder="Пошук за заголовком"
      groups={[
        { label: 'Статус', options: ['Усі', ...NEWS_STATUSES], value: draft.status, onChange: set('status') },
        { label: 'Категорія', options: ['Усі', ...NEWS_CATEGORIES], value: draft.category, onChange: set('category') },
      ]}
      onReset={() => setDraft(DEFAULT_NEWS_FILTER)}
      onApply={() => {
        setNewsFilter(draft);
        router.back();
      }}
    />
  );
}
