import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { memo, useLayoutEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { colors, fonts, radius } from '../../constants/theme';
import { useAdmin } from '../../context/AdminContext';
import { formatDateTime, LOG_TYPES } from '../../data/seed';

const ITEM_HEIGHT = 80;
const CARD_HEIGHT = 72;
const PADDING = 16;

const LogRow = memo(function LogRow({ log }) {
  const t = LOG_TYPES[log.type];
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: `${t.color}1A` }]}>
        <Ionicons name={t.icon} size={20} color={t.color} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{t.label}</Text>
          <Text style={styles.time}>{formatDateTime(log.createdAt)}</Text>
        </View>
        <Text style={styles.details} numberOfLines={1}>
          {log.details}
        </Text>
        <Text style={styles.actor} numberOfLines={1}>
          {log.actor}
        </Text>
      </View>
    </View>
  );
});

export default function LogsScreen() {
  const navigation = useNavigation();
  const { logs } = useAdmin();
  const [type, setType] = useState('ALL');
  const data = useMemo(() => (type === 'ALL' ? logs : logs.filter((l) => l.type === type)), [logs, type]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerSubtitle: `${logs.length} записів` });
  }, [navigation, logs.length]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={{ flexGrow: 0 }}>
        {[['ALL', 'Усі'], ...Object.entries(LOG_TYPES).map(([k, v]) => [k, v.label])].map(([key, label]) => (
          <Pressable key={key} onPress={() => setType(key)} style={[styles.chip, type === key && styles.chipActive]}>
            <Text style={[styles.chipText, type === key && { color: '#fff' }]}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <VirtualizedList
        data={data}
        getItemCount={(d) => d.length}
        getItem={(d, index) => d[index]}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: PADDING + ITEM_HEIGHT * index, index })}
        renderItem={({ item }) => <LogRow log={item} />}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={9}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Записів цього типу немає</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  chipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.text },
  list: { padding: PADDING },
  card: {
    height: CARD_HEIGHT,
    marginBottom: ITEM_HEIGHT - CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  time: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted },
  details: { fontFamily: fonts.regular, fontSize: 13, color: colors.text },
  actor: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted },
  empty: { fontFamily: fonts.regular, color: colors.textMuted, textAlign: 'center', marginTop: 40 },
});
