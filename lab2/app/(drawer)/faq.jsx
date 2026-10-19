import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '../../constants/theme';
import { faqSections } from '../../data/faq';

export default function FaqScreen() {
  const [openId, setOpenId] = useState(null);

  return (
    <SectionList
      sections={faqSections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.list}
      extraData={openId}
      ListHeaderComponent={
        <Text style={styles.intro}>Відповіді на поширені запитання. Натисніть на запитання, щоб побачити відповідь.</Text>
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Ionicons name={section.icon} size={18} color={colors.blue} />
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionCount}>{section.data.length}</Text>
        </View>
      )}
      renderItem={({ item }) => {
        const open = openId === item.id;
        return (
          <Pressable style={styles.item} onPress={() => setOpenId(open ? null : item.id)}>
            <View style={styles.questionRow}>
              <Text style={styles.question}>{item.q}</Text>
              <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
            </View>
            {open && <Text style={styles.answer}>{item.a}</Text>}
          </Pressable>
        );
      }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, paddingTop: 8 },
  intro: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, marginVertical: 8 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    backgroundColor: colors.background,
  },
  sectionTitle: { flex: 1, fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  sectionCount: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.blue,
    backgroundColor: '#E8EEF9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
  item: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  questionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  question: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  answer: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.textMuted, marginTop: 10 },
});
