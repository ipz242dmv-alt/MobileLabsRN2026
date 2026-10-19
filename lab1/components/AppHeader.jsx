import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, student } from '../constants/theme';
import BrandMark from './BrandMark';

export default function AppHeader() {
  const insets = useSafeAreaInsets();
  const [aboutVisible, setAboutVisible] = useState(false);

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <BrandMark size={40} />

      <View style={styles.titles}>
        <Text style={styles.title}>Лабораторна робота 1</Text>
        <Text style={styles.subtitle}>
          {student.fullName}, {student.group}
        </Text>
      </View>

      <Pressable
        onPress={() => setAboutVisible(true)}
        style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.6 }]}
        accessibilityLabel="Налаштування"
      >
        <Ionicons name="settings-sharp" size={22} color="#fff" />
      </Pressable>

      <Modal visible={aboutVisible} transparent animationType="fade" onRequestClose={() => setAboutVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setAboutVisible(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Про застосунок</Text>
            <Text style={styles.sheetText}>Дисципліна: Розробка мобільних додатків</Text>
            <Text style={styles.sheetText}>Тема: Expo та базові компоненти React Native</Text>
            <Text style={styles.sheetText}>
              Виконала: {student.fullName}, {student.group}
            </Text>
            <Pressable style={styles.sheetButton} onPress={() => setAboutVisible(false)}>
              <Text style={styles.sheetButtonText}>Закрити</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  titles: { flex: 1, alignItems: 'center' },
  title: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, gap: 8 },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 18, color: colors.text, marginBottom: 4 },
  sheetText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  sheetButton: {
    marginTop: 12,
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sheetButtonText: { fontFamily: fonts.semibold, color: '#fff' },
});
