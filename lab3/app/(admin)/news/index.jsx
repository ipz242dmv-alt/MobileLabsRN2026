import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { memo, useCallback, useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { Badge, HeaderIconButton } from '../../../components/ui';
import { colors, fonts, radius } from '../../../constants/theme';
import { DEFAULT_NEWS_FILTER, filterNews, useAdmin } from '../../../context/AdminContext';
import { formatDate } from '../../../data/seed';

const ITEM_HEIGHT = 108; // висота картки + відступ — для getItemLayout
const CARD_HEIGHT = 96;
const PADDING = 16;

const NewsRow = memo(function NewsRow({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress(item.id)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Badge label={item.status} small />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
      </View>
    </Pressable>
  );
});

export default function NewsListScreen() {
  const router = useRouter();
  const { news, newsFilter, setNewsFilter } = useAdmin();
  const data = useMemo(() => filterNews(news, newsFilter), [news, newsFilter]);

  const filtersActive =
    newsFilter.status !== 'Усі' || newsFilter.category !== 'Усі' || newsFilter.query.trim() !== '';

  const openNews = useCallback((id) => router.push(`/news/${id}`), [router]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerSubtitle: `${data.length} з ${news.length}`,
          headerRight: () => (
            <>
              <HeaderIconButton icon={filtersActive ? 'funnel' : 'funnel-outline'} label="Фільтр новин" onPress={() => router.push('/news-filter')} />
              <HeaderIconButton icon="add-circle-outline" label="Створити новину" onPress={() => router.push('/news-form')} />
            </>
          ),
        }}
      />

      {filtersActive && (
        <View style={styles.filterBar}>
          <Ionicons name="funnel" size={14} color={colors.blue} />
          <Text style={styles.filterText} numberOfLines={1}>
            {[newsFilter.status, newsFilter.category, newsFilter.query && `«${newsFilter.query}»`]
              .filter((v) => v && v !== 'Усі')
              .join(' · ')}
          </Text>
          <Pressable onPress={() => setNewsFilter(DEFAULT_NEWS_FILTER)} hitSlop={8}>
            <Text style={styles.reset}>Скинути</Text>
          </Pressable>
        </View>
      )}

      <VirtualizedList
        data={data}
        getItemCount={(d) => d.length}
        getItem={(d, index) => d[index]}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: PADDING + ITEM_HEIGHT * index, index })}
        renderItem={({ item }) => <NewsRow item={item} onPress={openNews} />}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        windowSize={9}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Новин за заданими фільтрами не знайдено</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: PADDING },
  card: {
    height: CARD_HEIGHT,
    marginBottom: ITEM_HEIGHT - CARD_HEIGHT,
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 76, height: 76, borderRadius: radius.sm, backgroundColor: '#DCE3EE' },
  body: { flex: 1, justifyContent: 'space-between' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  category: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 0.8, color: colors.blue },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 19, color: colors.text },
  date: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#E8EEF9',
    borderRadius: radius.sm,
  },
  filterText: { flex: 1, fontFamily: fonts.medium, fontSize: 13, color: colors.blue },
  reset: { fontFamily: fonts.bold, fontSize: 13, color: colors.blue },
  empty: { fontFamily: fonts.regular, color: colors.textMuted, textAlign: 'center', marginTop: 40 },
});
