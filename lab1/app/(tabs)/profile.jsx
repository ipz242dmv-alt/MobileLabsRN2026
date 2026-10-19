import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { colors, fonts, radius, student } from '../../constants/theme';

const initialProfile = {
  fullName: student.fullName,
  email: student.email,
  group: student.group,
  notifications: true,
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  const current = editing ? draft : profile;
  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };
  const cancel = () => setEditing(false);
  const save = () => {
    setProfile(draft);
    setEditing(false);
  };

  // Перемикачі змінюються одразу, без режиму редагування
  const toggle = (key) => (value) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setDraft((d) => ({ ...d, [key]: value }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.banner}>
          <View style={styles.bannerActions}>
            {editing ? (
              <>
                <RoundButton icon="close" onPress={cancel} label="Скасувати" />
                <RoundButton icon="checkmark" onPress={save} label="Зберегти" />
              </>
            ) : (
              <RoundButton icon="pencil" onPress={startEdit} label="Редагувати" />
            )}
          </View>
        </View>

        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={64} color={colors.textMuted} />
          </View>
        </View>

        <View style={styles.content}>
          <Field label="ПІБ" value={current.fullName} editable={editing} onChangeText={(v) => update('fullName', v)} />

          <Section title="Контакти">
            <Field
              label="Email"
              value={current.email}
              editable={editing}
              keyboardType="email-address"
              onChangeText={(v) => update('email', v)}
            />
            <Field label="Група" value={current.group} editable={editing} onChangeText={(v) => update('group', v)} />
          </Section>

          <Section title="Налаштування">
            <ToggleRow icon="notifications-outline" label="Сповіщення" value={profile.notifications} onValueChange={toggle('notifications')} />
          </Section>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function RoundButton({ icon, onPress, label }) {
  return (
    <Pressable onPress={onPress} accessibilityLabel={label} style={({ pressed }) => [styles.roundButton, pressed && { opacity: 0.7 }]}>
      <Ionicons name={icon} size={18} color={colors.blue} />
    </Pressable>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}

function Field({ label, editable, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        editable={editable}
        style={[styles.input, editable && styles.inputEditable]}
        placeholderTextColor={colors.placeholder}
      />
    </View>
  );
}

function ToggleRow({ icon, label, value, onValueChange }) {
  return (
    <View style={styles.toggleRow}>
      <Ionicons name={icon} size={20} color={colors.text} />
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: '#9DB4E3' }}
        thumbColor={value ? colors.blue : '#f4f3f4'}
        activeThumbColor={colors.blue}
      />
    </View>
  );
}

const AVATAR = 120;

const styles = StyleSheet.create({
  banner: { height: 140, backgroundColor: colors.blue, padding: 16 },
  bannerActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  roundButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: { alignItems: 'center', marginTop: -AVATAR / 2 },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: '#E9EDF4',
    borderWidth: 5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { paddingHorizontal: 16, gap: 16, marginTop: 8 },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 12, letterSpacing: 1, color: colors.textMuted },
  field: { gap: 6 },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text },
  input: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputEditable: { backgroundColor: '#fff', borderColor: colors.blue },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  toggleLabel: { flex: 1, fontFamily: fonts.medium, fontSize: 15, color: colors.text },
});
