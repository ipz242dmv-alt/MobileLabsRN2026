import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useMemo, useState } from 'react';
import { FlatList, Image, Platform, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { colors, fonts, radius } from '../../constants/theme';
import { news } from '../../data/content';

function NewsCard({ item }) {
  const { width } = useWindowDimensions();
  const coverWidth = width - 32; // відступи списку 16 + 16
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
    >
      <Image
        source={item.image}
        style={{ width: coverWidth, height: (coverWidth * 9) / 16 }}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardExcerpt} numberOfLines={3}>
          {item.excerpt}
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return news;
    return news.filter((n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
  }, [query]);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NewsCard item={item} />}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Пошук..."
            placeholderTextColor={colors.placeholder}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color={colors.placeholder} />
            </Pressable>
          )}
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Нічого не знайдено за запитом «{query}»</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 16 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardBody: { padding: 14, gap: 6 },
  cardTitle: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 21, color: colors.text },
  cardDate: { fontFamily: fonts.medium, fontSize: 12, color: colors.blue },
  cardExcerpt: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 19, color: colors.textMuted },
  empty: { fontFamily: fonts.regular, color: colors.textMuted, textAlign: 'center', marginTop: 32 },
});
