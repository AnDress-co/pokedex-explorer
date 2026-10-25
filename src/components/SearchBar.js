import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');

  const handleSearch = () => onSearch(text.trim().toLowerCase());

  const handleChange = (value) => {
    setText(value);
    if (value === '') onSearch(''); // campo vacío: volver a la lista normal
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Busca por nombre o número..."
        value={text}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#3299ee', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: '600' },
});