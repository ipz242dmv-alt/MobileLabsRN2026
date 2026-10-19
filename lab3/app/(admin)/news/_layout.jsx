import { Stack } from 'expo-router';
import AdminHeader from '../../../components/AdminHeader';
import { colors } from '../../../constants/theme';

// Вкладений Stack розділу "Новини": список -> /news/[id].
// Хедер стека замінено власним компонентом через screenOptions.header.
export default function NewsLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <AdminHeader {...props} />,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Новини' }} />
      <Stack.Screen name="[id]" options={{ title: 'Перегляд новини' }} />
    </Stack>
  );
}
