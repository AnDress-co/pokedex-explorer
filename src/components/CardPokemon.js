import react from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function CardPokemon({ item, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.number}>#{String(item.id).padStart(3, '0')}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        maxWidth: '50%',
        margin: 6,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    pressed: { opacity: 0.7 },
    image: { width: 100, height: 100, resizeMode: 'contain' },
    number: { color: '#888', fontSize: 12 },
    name: { fontSize: 16, fontWeight: '600', textTransform: 'capitalize' },
});