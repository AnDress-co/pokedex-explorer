// TEST VERSION: only checks that the service and the hook load data into a list.
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import useListPokedex from '../hooks/useListPokedex';

export default function ListScreen() {
  const { items, status, loadingMore, loadMore, retry } = useListPokedex();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokéDex Explorer</Text>
      <Text style={styles.subTitle}>Pokémon cargados: {items.length}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>
              #{item.id} - {item.name}
            </Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.footer} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', padding: 5 },
  subTitle: { fontSize: 18, fontWeight: '600', textAlign: 'center', padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 4 },
  image: { width: 100, height: 100, resizeMode: 'contain' },
  text: { fontSize: 16, marginLeft: 12 },
  footer: { padding: 16 },
});