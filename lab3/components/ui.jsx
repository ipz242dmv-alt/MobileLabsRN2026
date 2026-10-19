// Дрібні спільні UI-компоненти
import { Ionicons } from '@expo/vector-icons';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../constants/theme';

export const STATUS_COLORS = {
  Опубліковано: { bg: '#E3F4E0', fg: '#2F7D22' },
  Чернетка: { bg: '#ECEFF4', fg: '#556074' },
  'На перевірці': { bg: '#FDEBDC', fg: '#B5550C' },
  Активний: { bg: '#E3F4E0', fg: '#2F7D22' },
  Заблокований: { bg: '#FCE3DE', fg: '#B42A13' },
};

export function Badge({ label, small }) {
  const c = STATUS_COLORS[label] ?? { bg: '#E8EEF9', fg: colors.blue };
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, small && styles.badgeSmall]}>
      <Text style={[styles.badgeText, { color: c.fg }, small && { fontSize: 10 }]}>{label}</Text>
    </View>
  );
}

// Набір "чіпсів" для вибору одного значення (статус, категорія, роль)
export function ChipSelect({ options, value, onChange }) {
  return (
    <View style={styles.chips}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
          >
            {active && <Ionicons name="checkmark" size={14} color="#fff" />}
            <Text style={[styles.chipText, active && { color: '#fff' }]}>{opt}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function PrimaryButton({ title, onPress, icon, variant = 'primary', style }) {
  const danger = variant === 'danger';
  const outline = variant === 'outline';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        danger && { backgroundColor: colors.red },
        outline && { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={outline ? colors.text : '#fff'} /> : null}
      <Text style={[styles.buttonText, outline && { color: colors.text }]}>{title}</Text>
    </Pressable>
  );
}

export function HeaderIconButton({ icon, onPress, label }) {
  return (
    <Pressable onPress={onPress} accessibilityLabel={label} hitSlop={8} style={({ pressed }) => [styles.headerButton, pressed && { opacity: 0.6 }]}>
      <Ionicons name={icon} size={22} color={colors.text} />
    </Pressable>
  );
}

export function Avatar({ name, size = 40, color = colors.blue }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: fonts.bold, color: '#fff', fontSize: size * 0.38 }}>{initials}</Text>
    </View>
  );
}

// Нативний діалог підтвердження. Alert.alert не працює у web-версії
// react-native-web, тому для браузера використовується window.confirm.
export function confirmAction(title, message, onConfirm, confirmText = 'Видалити') {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Скасувати', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start' },
  badgeSmall: { paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontFamily: fonts.semibold, fontSize: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.blue, borderColor: colors.blue },
  chipText: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  button: {
    flexDirection: 'row',
    gap: 8,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: { fontFamily: fonts.bold, fontSize: 15, color: '#fff' },
  headerButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
});
