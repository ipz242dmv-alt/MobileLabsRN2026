import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import AdminDrawerContent from '../../components/AdminDrawerContent';
import AdminHeader from '../../components/AdminHeader';
import { colors, fonts } from '../../constants/theme';

// Група маршрутів (admin): службові розділи керування порталом новин
export default function AdminLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <AdminHeader {...props} />,
        drawerActiveTintColor: colors.blue,
        drawerActiveBackgroundColor: '#E8EEF9',
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontFamily: fonts.semibold, fontSize: 15 },
        drawerItemStyle: { borderRadius: 10 },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Дашборд',
          drawerIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          title: 'Новини',
          headerShown: false, // у розділу новин власний Stack із хедером
          drawerIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="users"
        options={{
          title: 'Користувачі',
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="logs"
        options={{
          title: 'Системні логи',
          drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
