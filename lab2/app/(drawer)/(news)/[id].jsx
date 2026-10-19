import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, fonts, radius } from '../../../constants/theme';
import { formatDate, makeNewsItem } from '../../../data/news';

export default function NewsDetailsScreen() {
  // Параметр динамічного маршруту /[id]
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const index = Number(id) - 1;
  const item = Number.isInteger(index) && index >= 0 ? makeNewsItem(index) : null;

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.body}>Новину не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={{ uri: item.image }} style={{ width, height: width * 0.6, backgroundColor: '#DCE3EE' }} />

      <Pressable onPress={goBack} style={styles.back} accessibilityLabel="Назад">
        <Ionicons name="arrow-back" size={20} color={colors.text} />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.badges}>
          <Text style={styles.badge}>{item.category}</Text>
          <Text style={styles.id}>ID: {id}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.meta}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{formatDate(item.date)}</Text>
          <Ionicons name="eye-outline" size={14} color={colors.textMuted} style={{ marginLeft: 12 }} />
          <Text style={styles.metaText}>{item.views} переглядів</Text>
        </View>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: -20,
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: 20,
    gap: 12,
  },
  badges: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#fff',
    backgroundColor: colors.blue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  id: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  title: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 30, color: colors.text },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 24, color: colors.text },
});
