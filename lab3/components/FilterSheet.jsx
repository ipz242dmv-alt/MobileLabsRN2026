import { Ionicons } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../constants/theme';
import { ChipSelect, PrimaryButton } from './ui';

// Спільний вміст для панелей фільтрації (presentation: 'formSheet')
export function FilterSheet({ title, query, onQuery, queryPlaceholder, groups, onApply, onReset }) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 20 }]} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{title}</Text>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={onQuery}
          placeholder={queryPlaceholder}
          placeholderTextColor={colors.placeholder}
          style={styles.input}
        />
      </View>

      {groups.map((g) => (
        <View key={g.label} style={{ gap: 8 }}>
          <Text style={styles.label}>{g.label}</Text>
          <ChipSelect options={g.options} value={g.value} onChange={g.onChange} />
        </View>
      ))}

      <View style={styles.actions}>
        <PrimaryButton title="Скинути" variant="outline" icon="refresh" onPress={onReset} style={{ flex: 1 }} />
        <PrimaryButton title="Застосувати" icon="checkmark" onPress={onApply} style={{ flex: 1 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 24, gap: 18 },
  title: { fontFamily: fonts.bold, fontSize: 20, color: colors.text },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 46,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text },
  actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
});
