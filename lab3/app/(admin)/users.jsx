import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { memo, useLayoutEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { Avatar, Badge, HeaderIconButton } from '../../components/ui';
import { colors, fonts, radius } from '../../constants/theme';
import { DEFAULT_USER_FILTER, filterUsers, useAdmin } from '../../context/AdminContext';

const ITEM_HEIGHT = 92;
const CARD_HEIGHT = 82;
const PADDING = 16;
const ROLE_COLORS = { Адміністратор: colors.red, Редактор: colors.blue, Автор: colors.orange, Читач: colors.green };

const UserRow = memo(function UserRow({ user, onToggle }) {
  const blocked = user.status === 'Заблокований';
  return (
    <View style={[styles.card, blocked && { opacity: 0.85 }]}>
      <Avatar name={user.name} size={44} color={ROLE_COLORS[user.role]} />
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        <View style={styles.badges}>
          <Text style={[styles.role, { color: ROLE_COLORS[user.role] }]}>{user.role}</Text>
          <Badge label={user.status} small />
        </View>
      </View>
      <Pressable
        onPress={() => onToggle(user.id)}
        accessibilityLabel={blocked ? `Розблокувати ${user.name}` : `Заблокувати ${user.name}`}
        style={({ pressed }) => [styles.toggle, blocked ? styles.toggleUnblock : styles.toggleBlock, pressed && { opacity: 0.7 }]}
      >
        <Ionicons name={blocked ? 'lock-open-outline' : 'ban-outline'} size={16} color={blocked ? colors.green : colors.red} />
        <Text style={[styles.toggleText, { color: blocked ? colors.green : colors.red }]}>
          {blocked ? 'Розблок.' : 'Блок.'}
        </Text>
      </Pressable>
    </View>
  );
});

export default function UsersScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { users, userFilter, setUserFilter, toggleUserStatus } = useAdmin();
  const data = useMemo(() => filterUsers(users, userFilter), [users, userFilter]);
  const filtersActive = userFilter.role !== 'Усі' || userFilter.status !== 'Усі' || userFilter.query.trim() !== '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSubtitle: `${data.length} з ${users.length}`,
      headerRight: () => (
        <HeaderIconButton icon={filtersActive ? 'funnel' : 'funnel-outline'} label="Фільтр користувачів" onPress={() => router.push('/users-filter')} />
      ),
    });
  }, [navigation, router, data.length, users.length, filtersActive]);

  const active = users.filter((u) => u.status === 'Активний').length;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Активних: <Text style={{ color: colors.green }}>{active}</Text> · Заблокованих:{' '}
          <Text style={{ color: colors.red }}>{users.length - active}</Text>
        </Text>
        {filtersActive && (
          <Pressable onPress={() => setUserFilter(DEFAULT_USER_FILTER)}>
            <Text style={styles.reset}>Скинути фільтр</Text>
          </Pressable>
        )}
      </View>

      <VirtualizedList
        data={data}
        getItemCount={(d) => d.length}
        getItem={(d, index) => d[index]}
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: PADDING + ITEM_HEIGHT * index, index })}
        renderItem={({ item }) => <UserRow user={item} onToggle={toggleUserStatus} />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={9}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Користувачів не знайдено</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12 },
  summaryText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.textMuted },
  reset: { fontFamily: fonts.bold, fontSize: 13, color: colors.blue },
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
  name: { fontFamily: fonts.semibold, fontSize: 15, color: colors.text },
  email: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  badges: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  role: { fontFamily: fonts.bold, fontSize: 11 },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  toggleBlock: { borderColor: '#F6C3B9', backgroundColor: '#FFF5F3' },
  toggleUnblock: { borderColor: '#BFE3B8', backgroundColor: '#F2FBF0' },
  toggleText: { fontFamily: fonts.semibold, fontSize: 12 },
  empty: { fontFamily: fonts.regular, color: colors.textMuted, textAlign: 'center', marginTop: 40 },
});
