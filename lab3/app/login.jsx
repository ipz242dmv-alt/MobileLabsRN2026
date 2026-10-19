import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import { PrimaryButton } from '../components/ui';
import { colors, fonts, radius } from '../constants/theme';
import { useAdmin } from '../context/AdminContext';

export default function LoginScreen() {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState('');

  // Після успішного входу Stack.Protected сам відкриває панель адміністрування
  const onSubmit = () => {
    const res = login(email, password);
    if (!res.ok) setError(res.error);
  };

  const fillDemo = () => {
    setEmail('admin@ztu.edu.ua');
    setPassword('admin123');
    setError('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <BrandMark size={64} />
            <Text style={styles.title}>Адмін-панель</Text>
            <Text style={styles.subtitle}>Портал новин університету</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email адміністратора</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setError('');
                }}
                placeholder="admin@ztu.edu.ua"
                placeholderTextColor={colors.placeholder}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Пароль</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  setError('');
                }}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={secure}
                style={styles.input}
                onSubmitEditing={onSubmit}
              />
              <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
                <Ionicons name={secure ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            {error ? (
              <View style={styles.error}>
                <Ionicons name="alert-circle" size={16} color={colors.red} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <PrimaryButton title="Увійти" icon="log-in-outline" onPress={onSubmit} style={{ marginTop: 20 }} />
          </View>

          <Pressable onPress={fillDemo} style={styles.demo}>
            <Ionicons name="key-outline" size={16} color={colors.blue} />
            <Text style={styles.demoText}>Демо-доступ: admin@ztu.edu.ua / admin123</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  hero: { alignItems: 'center', gap: 6, marginBottom: 28 },
  title: { fontFamily: fonts.bold, fontSize: 26, color: colors.text, marginTop: 10 },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: 20, borderWidth: 1, borderColor: colors.border },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text, marginBottom: 6 },
  inputRow: {
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
  error: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 12 },
  errorText: { fontFamily: fonts.medium, fontSize: 13, color: colors.red },
  demo: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', marginTop: 18, padding: 8 },
  demoText: { fontFamily: fonts.medium, fontSize: 13, color: colors.blue },
});
