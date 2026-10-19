import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { Drawer, DrawerContentScrollView, DrawerItem, DrawerItemList } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import BrandMark from '../../components/BrandMark';
import { colors, fonts, student } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

function DrawerContent(props) {
  const { user, logout } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.profile}>
        <BrandMark size={48} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {user?.email}
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      <View style={{ flex: 1 }} />

      <DrawerItem
        label="Вийти"
        onPress={logout}
        icon={({ size }) => <Ionicons name="log-out-outline" size={size} color={colors.red} />}
        labelStyle={[styles.label, { color: colors.red }]}
      />
      <Text style={styles.footer}>
        ЛР №2 · {student.fullName}, {student.group}
      </Text>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { isAuthenticated } = useAuth();

  // Захищений маршрут: неавторизованого користувача перенаправляємо на вхід
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: colors.text,
        headerTitleStyle: { fontFamily: fonts.bold, fontSize: 18 },
        headerStyle: { backgroundColor: colors.surface },
        drawerActiveTintColor: colors.blue,
        drawerActiveBackgroundColor: '#E8EEF9',
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: styles.label,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="(news)"
        options={{
          title: 'Новини',
          drawerIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="faq"
        options={{
          title: 'Довідковий центр',
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  name: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  email: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  label: { fontFamily: fonts.semibold, fontSize: 15 },
  footer: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textMuted,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});
