import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT, STAT_LABELS } from '../constants/pokemonTypes';

export default function StatisticsPokemon({ name, value }) {
    const percent = Math.min(value / MAX_STAT, 1) * 100;

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${percent}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    label: { width: 100, fontSize: 14, color: '#444' },
    value: { width: 36, fontWeight: '700', textAlign: 'right', marginRight: 10 },
    track: { flex: 1, height: 10, backgroundColor: '#E5E5EA', borderRadius: 5, overflow: 'hidden' },
    fill: { height: '100%', backgroundColor: '#3299ee', borderRadius: 5 },
});