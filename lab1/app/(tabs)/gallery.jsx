import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, fonts, radius } from '../../constants/theme';
import { gallery } from '../../data/content';

export default function GalleryScreen() {
  const [mode, setMode] = useState('grid'); // 'grid' | 'list'
  const [selected, setSelected] = useState(null);
  const isGrid = mode === 'grid';
  const { width } = useWindowDimensions();
  const tileSize = (width - 32 - 12) / 2; // 2 колонки, відступи 16 і проміжок 12
  const viewerSize = width - 32;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.toolbar}>
        <Text style={styles.heading}>Фотогалерея</Text>
        <View style={styles.switcher}>
          <ModeButton icon="grid" label="Сітка" active={isGrid} onPress={() => setMode('grid')} />
          <ModeButton icon="list" label="Список" active={!isGrid} onPress={() => setMode('list')} />
        </View>
      </View>

      <FlatList
        key={mode} // зміна numColumns вимагає повторного монтування списку
        data={gallery}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={isGrid ? { gap: 12 } : undefined}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.tile, isGrid ? styles.tileGrid : styles.tileList]}
            onPress={() => setSelected(item)}
          >
            <Image
              source={item.image}
              style={isGrid ? { width: tileSize, height: tileSize } : styles.imageList}
              resizeMode="cover"
            />
            {!isGrid && (
              <View style={styles.listInfo}>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.meta}>Фото №{item.id}</Text>
              </View>
            )}
          </Pressable>
        )}
      />

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <Pressable style={styles.viewer} onPress={() => setSelected(null)}>
          {selected && (
            <>
              <Image
                source={selected.image}
                style={{ width: viewerSize, height: viewerSize, borderRadius: 12 }}
                resizeMode="contain"
              />
              <Text style={styles.viewerCaption}>{selected.caption}</Text>
            </>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}

function ModeButton({ icon, label, active, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityLabel={label} style={[styles.modeButton, active && styles.modeButtonActive]}>
      <Ionicons name={icon} size={18} color={active ? '#fff' : colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: { fontFamily: fonts.bold, fontSize: 20, color: colors.text },
  switcher: { flexDirection: 'row', gap: 6 },
  modeButton: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  modeButtonActive: { backgroundColor: colors.blue },
  list: { padding: 16, gap: 12 },
  tile: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  tileGrid: {},
  tileList: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  imageList: { width: 96, height: 96 },
  listInfo: { flex: 1, paddingHorizontal: 14, gap: 4 },
  caption: { fontFamily: fonts.semibold, fontSize: 15, color: colors.text },
  meta: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  viewer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  viewerCaption: { fontFamily: fonts.semibold, color: '#fff', fontSize: 16, marginTop: 16 },
});
