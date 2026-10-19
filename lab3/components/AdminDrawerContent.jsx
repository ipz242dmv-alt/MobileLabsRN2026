import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, student } from '../constants/theme';
import { useAdmin } from '../context/AdminContext';
import BrandMark from './BrandMark';
import { Avatar } from './ui';

// Власний вміст бокового меню: профіль адміністратора, пункти навігації, кнопка "Вийти"
export default function AdminDrawerContent(props) {
  const { admin, logout } = useAdmin();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.profile, { paddingTop: insets.top + 20 }]}>
        <View style={styles.brandRow}>
          <BrandMark size={28} />
          <Text style={styles.brandText}>Адмін-панель новин</Text>
        </View>
        <Avatar name={admin?.name ?? 'А'} size={64} color={colors.green} />
        <Text style={styles.name}>{admin?.name}</Text>
        <Text style={styles.email}>{admin?.email}</Text>
        <View style={styles.roleBadge}>
          <Ionicons name="shield-checkmark" size={12} color="#fff" />
          <Text style={styles.roleText}>{admin?.role}</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 12 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable
          onPress={logout}
          style={({ pressed }) => [styles.logout, pressed && { opacity: 0.7 }]}
          accessibilityLabel="Вийти"
        >
          <Ionicons name="log-out-outline" size={22} color={colors.red} />
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
        <Text style={styles.footer}>
          ЛР №3 · {student.fullName}, {student.group}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: { backgroundColor: colors.blue, paddingHorizontal: 20, paddingBottom: 20 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  brandText: { fontFamily: fonts.semibold, color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  name: { fontFamily: fonts.bold, fontSize: 18, color: '#fff', marginTop: 12 },
  email: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  roleText: { fontFamily: fonts.semibold, fontSize: 11, color: '#fff' },
  bottom: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border, paddingHorizontal: 12, paddingTop: 8 },
  logout: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 10 },
  logoutText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.red },
  footer: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, paddingHorizontal: 12, marginTop: 4 },
});
