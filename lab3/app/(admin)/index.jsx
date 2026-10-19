import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/ui';
import { colors, fonts, radius } from '../../constants/theme';
import { useAdmin } from '../../context/AdminContext';
import { formatDateTime, LOG_TYPES, NEWS_STATUSES } from '../../data/seed';

function computeStats(news, users, logs) {
  return {
    newsTotal: news.length,
    usersTotal: users.length,
    logsTotal: logs.length,
    byStatus: NEWS_STATUSES.map((s) => ({ status: s, count: news.filter((n) => n.status === s).length })),
    activeUsers: users.filter((u) => u.status === 'Активний').length,
    blockedUsers: users.filter((u) => u.status === 'Заблокований').length,
    recentLogs: logs.slice(0, 5),
    updatedAt: new Date(),
  };
}

export default function DashboardScreen() {
  const router = useRouter();
  const { news, users, logs } = useAdmin();
  const [stats, setStats] = useState(null);

  // useFocusEffect: статистика перераховується щоразу, коли екран отримує фокус
  // (повернення з інших розділів, закриття модального вікна тощо)
  useFocusEffect(
    useCallback(() => {
      setStats(computeStats(news, users, logs));
    }, [news, users, logs])
  );

  if (!stats) return null;

  const maxStatus = Math.max(1, ...stats.byStatus.map((s) => s.count));
  const statusColors = { Опубліковано: colors.green, Чернетка: colors.textMuted, 'На перевірці': colors.orange };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.updated}>
        <Ionicons name="sync-outline" size={14} color={colors.textMuted} />
        <Text style={styles.updatedText}>Оновлено о {stats.updatedAt.toLocaleTimeString('uk-UA')}</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard icon="newspaper" label="Новини" value={stats.newsTotal} color={colors.blue} onPress={() => router.push('/news')} />
        <StatCard icon="people" label="Користувачі" value={stats.usersTotal} color={colors.green} onPress={() => router.push('/users')} />
        <StatCard icon="document-text" label="Логи" value={stats.logsTotal} color={colors.orange} onPress={() => router.push('/logs')} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Новини за статусом</Text>
        {stats.byStatus.map(({ status, count }) => (
          <View key={status} style={styles.barRow}>
            <Text style={styles.barLabel}>{status}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${(count / maxStatus) * 100}%`, backgroundColor: statusColors[status] }]} />
            </View>
            <Text style={styles.barValue}>{count}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Користувачі</Text>
        <View style={styles.usersRow}>
          <View style={styles.userStat}>
            <Text style={[styles.userValue, { color: colors.green }]}>{stats.activeUsers}</Text>
            <Text style={styles.userLabel}>Активні</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.userStat}>
            <Text style={[styles.userValue, { color: colors.red }]}>{stats.blockedUsers}</Text>
            <Text style={styles.userLabel}>Заблоковані</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Останні дії</Text>
          <Pressable onPress={() => router.push('/logs')}>
            <Text style={styles.link}>Усі логи</Text>
          </Pressable>
        </View>
        {stats.recentLogs.map((log) => {
          const t = LOG_TYPES[log.type];
          return (
            <View key={log.id} style={styles.logRow}>
              <Ionicons name={t.icon} size={18} color={t.color} />
              <View style={{ flex: 1 }}>
                <Text style={styles.logTitle}>{t.label}</Text>
                <Text style={styles.logDetails} numberOfLines={1}>
                  {log.details}
                </Text>
              </View>
              <Text style={styles.logTime}>{formatDateTime(log.createdAt).slice(-5)}</Text>
            </View>
          );
        })}
      </View>

      <PrimaryButton title="Створити новину" icon="add" onPress={() => router.push('/news-form')} />
    </ScrollView>
  );
}

function StatCard({ icon, label, value, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.stat, pressed && { opacity: 0.85 }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color="#fff" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14 },
  updated: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  updatedText: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  statsRow: { flexDirection: 'row', gap: 10 },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: fonts.bold, fontSize: 26, color: colors.text, marginTop: 10 },
  statLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: 16, gap: 12, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.text },
  link: { fontFamily: fonts.semibold, fontSize: 13, color: colors.blue },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  barLabel: { width: 100, fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  barTrack: { flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.background, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },
  barValue: { width: 28, textAlign: 'right', fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  usersRow: { flexDirection: 'row', alignItems: 'center' },
  userStat: { flex: 1, alignItems: 'center' },
  userValue: { fontFamily: fonts.bold, fontSize: 24 },
  userLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
  divider: { width: 1, height: 36, backgroundColor: colors.border },
  logRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logTitle: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text },
  logDetails: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  logTime: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted },
});
