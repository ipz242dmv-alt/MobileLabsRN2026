import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/theme';

// Емблема з восьми кольорових точок у фірмових кольорах.
// За бажанням її можна замінити на офіційний логотип з https://media.ztu.edu.ua/
const DOTS = [colors.blue, colors.red, colors.orange, colors.green];

export default function BrandMark({ size = 40 }) {
  const dot = size * 0.22;
  const r = size / 2 - dot / 2 - size * 0.04;

  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: dot,
              height: dot,
              borderRadius: dot / 2,
              backgroundColor: DOTS[i % 4],
              left: size / 2 + r * Math.cos(a) - dot / 2,
              top: size / 2 + r * Math.sin(a) - dot / 2,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.surface },
});
