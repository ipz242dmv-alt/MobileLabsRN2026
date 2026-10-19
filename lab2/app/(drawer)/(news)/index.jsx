import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native';
import NewsCard, { ITEM_HEIGHT } from '../../../components/NewsCard';
import { colors, fonts } from '../../../constants/theme';
import { generateNews, INITIAL_COUNT, MAX_COUNT, PAGE_SIZE } from '../../../data/news';

const LIST_PADDING = 16;

export default function NewsFeedScreen() {
  const router = useRouter();
  const [news, setNews] = useState(() => generateNews(0, INITIAL_COUNT));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingRef = useRef(false);
  const listRef = useRef(null);

  // Лише для web: вимикаємо браузерний scroll anchoring. Інакше після підвантаження
  // Chrome тримає список "приклеєним" до низу й onEndReached спрацьовує знову і знову.
  // На Android/iOS цей ефект нічого не робить.
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = listRef.current?.getScrollableNode?.();
    if (node?.style) node.style.overflowAnchor = 'none';
  }, []);

  const hasMore = news.length < MAX_COUNT;

  // Pull-to-Refresh: імітуємо запит до сервера та скидаємо стрічку
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNews(generateNews(0, INITIAL_COUNT));
      setRefreshing(false);
    }, 1200);
  }, []);

  // Infinite Scroll: підвантажуємо наступну сторінку при наближенні до кінця
  const onEndReached = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoadingMore(true);
    setTimeout(() => {
      setNews((prev) => [...prev, ...generateNews(prev.length, PAGE_SIZE)]);
      setLoadingMore(false);
      loadingRef.current = false;
    }, 900);
  }, [hasMore]);

  // Стабільна функція (useCallback) — інакше React.memo у картці не спрацює
  const openNews = useCallback((id) => router.push(`/${id}`), [router]);

  const renderItem = useCallback(({ item }) => <NewsCard item={item} onPress={openNews} />, [openNews]);

  // getItemLayout: координати елемента обчислюються без вимірювання розмітки
  const getItemLayout = useCallback(
    (_, index) => ({ length: ITEM_HEIGHT, offset: LIST_PADDING + ITEM_HEIGHT * index, index }),
    []
  );

  return (
    <FlatList
      ref={listRef}
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.list}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews={Platform.OS === 'android'}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.blue]} tintColor={colors.blue} />
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {loadingMore ? (
            <ActivityIndicator color={colors.blue} />
          ) : (
            <Text style={styles.footerText}>
              {hasMore ? `Завантажено ${news.length} новин` : `Це всі новини (${news.length})`}
            </Text>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: LIST_PADDING },
  footer: { height: 56, alignItems: 'center', justifyContent: 'center' },
  footerText: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
});
