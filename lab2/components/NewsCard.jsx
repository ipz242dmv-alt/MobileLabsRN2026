import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../constants/theme';
import { formatDate } from '../data/news';

// Фіксована висота картки потрібна для getItemLayout
export const CARD_HEIGHT = 112;
export const CARD_GAP = 12;
export const ITEM_HEIGHT = CARD_HEIGHT + CARD_GAP;

function NewsCard({ item, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{formatDate(item.date)}</Text>
          <View style={styles.views}>
            <Ionicons name="eye-outline" size={13} color={colors.textMuted} />
            <Text style={styles.metaText}>{item.views}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.number}>#{item.id}</Text>
    </Pressable>
  );
}

// React.memo: вже відрендерені картки не перемальовуються,
// коли батьківський список оновлює свій стан
export default memo(NewsCard);

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    marginBottom: CARD_GAP,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 12,
  },
  image: { width: 88, height: 88, borderRadius: radius.sm, backgroundColor: '#DCE3EE' },
  body: { flex: 1, justifyContent: 'space-between' },
  category: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 0.8, color: colors.blue },
  title: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 19, color: colors.text },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  views: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  number: {
    position: 'absolute',
    top: 8,
    right: 10,
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.placeholder,
  },
});
