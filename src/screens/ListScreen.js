import { useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import useListPokedex from '../hooks/useListPokedex';
import SearchBar from '../components/SearchBar';
import CardPokemon from '../components/CardPokemon';
import { getPokemonByQuery, NotFoundError } from '../services/pokeApi'; // ajusta la ruta

export default function ListScreen({ navigation }) {
    const { items, status, loadingMore, loadMore, retry } = useListPokedex();
    const [search, setSearch] = useState({ status: 'idle', item: null });

    const handleSearch = async (query) => {
        if (!query) {
            setSearch({ status: 'idle', item: null });
            return;
        }
        setSearch({ status: 'loading', item: null });
        try {
            const item = await getPokemonByQuery(query);
            setSearch({ status: 'found', item });
        } catch (e) {
            setSearch({ status: e instanceof NotFoundError ? 'notfound' : 'error', item: null });
        }
    };

    if (status === 'loading') {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Cargando Pokémon...</Text>
            </View>
        );
    }

    if (status === 'error') {
        return (
            <View style={styles.center}>
                <Text>No pudimos cargar los datos.</Text>
                <Button title="Reintentar" onPress={retry} />
            </View>
        );
    }

    const isSearching = search.status !== 'idle';
    const data = search.status === 'found' ? [search.item] : items;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PokéDex Explorer</Text>
            <SearchBar onSearch={handleSearch} />
            {search.status === 'loading' && <ActivityIndicator style={styles.footer} />}
            {search.status === 'notfound' && <Text style={styles.message}>No se encontró ningún Pokémon.</Text>}
            {search.status === 'error' && <Text style={styles.message}>Error al buscar. Intenta de nuevo.</Text>}
            {(search.status === 'idle' || search.status === 'found') && (
                <FlatList
                    data={data}
                    keyExtractor={(item) => String(item.id)}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <CardPokemon item={item} onPress={() => navigation.navigate('Detail', { dataPokemon: item })} />
                    )}
                    onEndReached={isSearching ? null : loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loadingMore && !isSearching ? <ActivityIndicator style={styles.footer} /> : null}
                />
            )}
            <Text style={styles.counter}>Nro. de pokémons: {items.length}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
    message: { textAlign: 'center', marginTop: 20, fontSize: 16 },
    list: { padding: 8 },
    footer: { padding: 16 },
    counter: { textAlign: 'center', marginVertical: 8, fontSize: 12, fontWeight: '600' },
});