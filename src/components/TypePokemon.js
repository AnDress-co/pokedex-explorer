import { StyleSheet, Text, View } from 'react-native';
import { TYPE_COLORS, TYPE_LABELS } from '../constants/pokemonTypes';

export default function TypePokemon({ type }) {
    return (
        <View style={[styles.badge, { backgroundColor: TYPE_COLORS[type] ?? '#999' }]}>
            <Text style={styles.text}>{TYPE_LABELS[type] ?? type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16 },
    text: { color: '#fff', fontWeight: '600' },
});