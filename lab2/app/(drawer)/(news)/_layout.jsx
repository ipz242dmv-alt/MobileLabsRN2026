import { Stack } from 'expo-router';

// Вкладений Stack усередині Drawer. Заголовок стека вимкнено,
// щоб він не дублював заголовок Drawer.
export default function NewsStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
