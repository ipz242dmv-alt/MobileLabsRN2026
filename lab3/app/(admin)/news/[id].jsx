import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Badge, confirmAction, PrimaryButton } from '../../../components/ui';
import { colors, fonts } from '../../../constants/theme';
import { useAdmin } from '../../../context/AdminContext';
import { formatDateTime } from '../../../data/seed';

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams(); // параметр динамічного маршруту /news/[id]
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { news, deleteNews } = useAdmin();
  const item = news.find((n) => n.id === id);

  // Якщо новину видалили (тут або з модального вікна редагування) —
  // повертаємося до списку, щойно цей екран у фокусі
  const existedRef = useRef(false);
  useEffect(() => {
    if (item) existedRef.current = true;
  }, [item]);
  useFocusEffect(
    useCallback(() => {
      if (!item && existedRef.current) {
        if (router.canGoBack()) router.back();
        else router.replace('/news');
      }
    }, [item, router])
  );

  if (!item) {
    return (
      <View style={styles.empty}>
        <Ionicons name="alert-circle-outline" size={40} color={colors.textMuted} />
        <Text style={styles.emptyText}>Новину з ID {id} не знайдено</Text>
      </View>
    );
  }

  const onDelete = () =>
    confirmAction('Видалити новину?', `«${item.title}» буде видалено без можливості відновлення.`, () =>
      deleteNews(item.id)
    );

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: item.imageUrl }} style={{ width, height: width * 0.56, backgroundColor: '#DCE3EE' }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Badge label={item.status} />
          <Badge label={item.category} />
          <Text style={styles.id}>ID {item.id}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text style={styles.meta}>Створено: {formatDateTime(item.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.url}>
          <Ionicons name="image-outline" size={14} color={colors.textMuted} />
          <Text style={styles.urlText} numberOfLines={1}>
            {item.imageUrl}
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            title="Редагувати"
            icon="create-outline"
            style={{ flex: 1 }}
            onPress={() => router.push({ pathname: '/news-form', params: { id: item.id } })}
          />
          <PrimaryButton title="Видалити" icon="trash-outline" variant="danger" style={{ flex: 1 }} onPress={onDelete} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyText: { fontFamily: fonts.medium, color: colors.textMuted },
  content: { padding: 20, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  id: { marginLeft: 'auto', fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  title: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 30, color: colors.text },
  meta: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },
  text: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: colors.text },
  url: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  urlText: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
});
