import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChipSelect, confirmAction, PrimaryButton } from '../components/ui';
import { colors, fonts, radius } from '../constants/theme';
import { useAdmin } from '../context/AdminContext';
import { NEWS_CATEGORIES, NEWS_STATUSES } from '../data/seed';

const EMPTY = { title: '', category: NEWS_CATEGORIES[0], status: 'Чернетка', imageUrl: '', text: '' };

// Модальне вікно (presentation: 'modal') для створення та редагування новини
export default function NewsFormModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { news, createNews, updateNews, deleteNews } = useAdmin();
  // Знімок новини на момент відкриття: після видалення форма не "перемикається" на створення
  const [existing] = useState(() => (id ? news.find((n) => n.id === id) : null));

  const [form, setForm] = useState(() =>
    existing
      ? { title: existing.title, category: existing.category, status: existing.status, imageUrl: existing.imageUrl, text: existing.text }
      : EMPTY
  );
  const [errors, setErrors] = useState({});
  const set = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 5) e.title = 'Заголовок має містити щонайменше 5 символів';
    if (form.imageUrl.trim() && !/^https?:\/\/\S+$/i.test(form.imageUrl.trim())) e.imageUrl = 'Посилання має починатися з http:// або https://';
    if (form.text.trim().length < 10) e.text = 'Текст новини має містити щонайменше 10 символів';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    const data = {
      ...form,
      title: form.title.trim(),
      text: form.text.trim(),
      imageUrl: form.imageUrl.trim() || `https://picsum.photos/seed/admin-${Date.now()}/800/500`,
    };
    if (existing) updateNews(existing.id, data);
    else createNews(data);
    router.back(); // закриття модального вікна
  };

  const remove = () =>
    confirmAction('Видалити новину?', `«${existing.title}» буде видалено.`, () => {
      deleteNews(existing.id);
      router.back(); // екран деталей під модальним вікном сам повернеться до списку
    });

  const validUrl = /^https?:\/\/\S+$/i.test(form.imageUrl.trim());

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 12 : insets.top + 8 }]}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityLabel="Закрити">
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{existing ? 'Редагування новини' : 'Нова новина'}</Text>
        <Pressable onPress={save} hitSlop={10} accessibilityLabel="Зберегти">
          <Text style={styles.headerSave}>Зберегти</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.form, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        <Field label="Заголовок" error={errors.title}>
          <TextInput value={form.title} onChangeText={set('title')} placeholder="Введіть заголовок" placeholderTextColor={colors.placeholder} style={styles.input} />
        </Field>

        <Field label="Категорія">
          <ChipSelect options={NEWS_CATEGORIES} value={form.category} onChange={set('category')} />
        </Field>

        <Field label="Статус">
          <ChipSelect options={NEWS_STATUSES} value={form.status} onChange={set('status')} />
        </Field>

        <Field label="Посилання на зображення (URL)" error={errors.imageUrl}>
          <TextInput
            value={form.imageUrl}
            onChangeText={set('imageUrl')}
            placeholder="https://..."
            placeholderTextColor={colors.placeholder}
            autoCapitalize="none"
            keyboardType="url"
            style={styles.input}
          />
          {validUrl && <Image source={{ uri: form.imageUrl.trim() }} style={styles.preview} />}
        </Field>

        <Field label="Текст новини" error={errors.text}>
          <TextInput
            value={form.text}
            onChangeText={set('text')}
            placeholder="Текст новини..."
            placeholderTextColor={colors.placeholder}
            multiline
            textAlignVertical="top"
            style={[styles.input, styles.textarea]}
          />
        </Field>

        <PrimaryButton title={existing ? 'Зберегти зміни' : 'Створити новину'} icon="checkmark" onPress={save} />
        {existing && <PrimaryButton title="Видалити новину" icon="trash-outline" variant="danger" onPress={remove} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, error, children }) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.text },
  headerSave: { fontFamily: fonts.bold, fontSize: 15, color: colors.blue },
  form: { padding: 16, gap: 18 },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text },
  input: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  textarea: { minHeight: 130 },
  preview: { width: '100%', height: 160, borderRadius: radius.sm, backgroundColor: '#DCE3EE' },
  error: { fontFamily: fonts.medium, fontSize: 12, color: colors.red },
});
