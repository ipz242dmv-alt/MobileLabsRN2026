import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BrandMark from '../components/BrandMark';
import { colors, fonts, radius } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Після успішного входу стан змінюється — і користувача автоматично
  // перенаправляє в застосунок
  if (isAuthenticated) return <Redirect href="/" />;

  const onSubmit = () => {
    const result = login(email, password);
    if (!result.ok) setError(result.error);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.brand}>
            <BrandMark size={72} />
            <Text style={styles.title}>Новини політехніки</Text>
            <Text style={styles.subtitle}>Увійдіть, щоб переглядати стрічку новин</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
              <TextInput
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  setError('');
                }}
                placeholder="student@ztu.edu.ua"
                placeholderTextColor={colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
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
                placeholder="Щонайменше 6 символів"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showPassword}
                style={styles.input}
                onSubmitEditing={onSubmit}
              />
              <Pressable onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.red} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]} onPress={onSubmit}>
              <Text style={styles.buttonText}>Увійти</Text>
            </Pressable>
          </View>

          <Text style={styles.hint}>Демо: будь-яка коректна пошта та пароль від 6 символів</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  brand: { alignItems: 'center', marginBottom: 28, gap: 8 },
  title: { fontFamily: fonts.bold, fontSize: 24, color: colors.text, marginTop: 8 },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: colors.background,
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.text, ...Platform.select({ web: { outlineStyle: 'none' } }) },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  errorText: { fontFamily: fonts.medium, fontSize: 13, color: colors.red, flex: 1 },
  button: {
    marginTop: 20,
    backgroundColor: colors.blue,
    borderRadius: radius.sm,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontFamily: fonts.bold, fontSize: 16, color: '#fff' },
  hint: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 16 },
});
