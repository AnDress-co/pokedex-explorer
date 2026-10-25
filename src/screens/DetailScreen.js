import { ActivityIndicator, Pressable, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import useDetailPokedex from '../hooks/useDetailPokedex';
import TypePokemon from '../components/TypePokemon';
import StatisticsPokemon from '../components/StatisticsPokemon';

export default function DetailScreen({ route, navigation }) {
    const { dataPokemon } = route.params;
    const { detail, status, retry } = useDetailPokedex(dataPokemon.id);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            
            <Image source={{ uri: dataPokemon.image }} style={styles.image} />
            <Text style={styles.name}>{dataPokemon.name}</Text>
            <Text style={styles.number}>#{String(dataPokemon.id).padStart(3, '0')}</Text>

            {status === 'loading' && <ActivityIndicator size="large" style={styles.loader} />}

            {status === 'error' && (
                <View style={styles.center}>
                    <Text>No pudimos cargar el detalle.</Text>
                    <Button title="Reintentar" onPress={retry} />
                </View>
            )}

            {status === 'success' && (
                <>
                    <View style={styles.types}>
                        {detail.types.map((type) => (
                            <TypePokemon key={type} type={type} />
                        ))}
                    </View>

                    <View style={styles.measures}>
                        <View style={styles.measure}>
                            <Text style={styles.measureValue}>{detail.height} m</Text>
                            <Text style={styles.measureLabel}>Altura</Text>
                        </View>
                        <View style={styles.measure}>
                            <Text style={styles.measureValue}>{detail.weight} kg</Text>
                            <Text style={styles.measureLabel}>Peso</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Estadísticas base</Text>
                    <View style={styles.stats}>
                        {detail.stats.map((stat) => (
                            <StatisticsPokemon key={stat.name} name={stat.name} value={stat.value} />
                        ))}
                    </View>
                </>
            )}

            <View style={styles.back}>
                <Pressable style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Volver</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, alignItems: 'center' },
    image: { width: 250, height: 250, resizeMode: 'contain', marginVertical: 20, backgroundColor: '#e7e7e7', borderRadius: 125, padding: 16 },
    name: { fontSize: 28, fontWeight: '700', textTransform: 'capitalize' },
    number: { fontSize: 16, color: '#888', marginBottom: 12 },
    loader: { marginVertical: 24 },
    center: { alignItems: 'center', gap: 12, marginVertical: 24 },
    types: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    measures: { flexDirection: 'row', gap: 40, marginBottom: 20 },
    measure: { alignItems: 'center' },
    measureValue: { fontSize: 20, fontWeight: '700' },
    measureLabel: { color: '#888' },
    sectionTitle: { fontSize: 18, fontWeight: '700', alignSelf: 'flex-start', marginBottom: 8, marginBottom: 14 },
    stats: { width: '100%' },
    back: { marginTop: 24, width: '100%' },
    button: { backgroundColor: '#3299ee', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, textAlign: 'center' },
    buttonText: { color: 'white', fontWeight: '700', textAlign: 'center', fontSize: 16 },
});