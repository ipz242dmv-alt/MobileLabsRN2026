import { DrawerActions } from 'expo-router/react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants/theme';
import { HeaderIconButton } from './ui';

// Власний хедер, що передається через screenOptions.header
// (і для Drawer, і для вкладеного Stack). Якщо є попередній екран — кнопка "Назад",
// інакше — кнопка відкриття бокового меню.
export default function AdminHeader({ navigation, options, route, back }) {
  const insets = useSafeAreaInsets();
  const title = options.title ?? route.name;

  return (
    <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
      {back ? (
        <HeaderIconButton icon="arrow-back" label="Назад" onPress={navigation.goBack} />
      ) : (
        <HeaderIconButton icon="menu" label="Меню" onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {options.headerSubtitle ? <Text style={styles.subtitle}>{options.headerSubtitle}</Text> : null}
      </View>
      <View style={styles.right}>{options.headerRight?.({ tintColor: colors.text })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: colors.surface,
    borderBottomWidth: 3,
    borderBottomColor: colors.blue,
  },
  title: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  right: { flexDirection: 'row', alignItems: 'center' },
});
