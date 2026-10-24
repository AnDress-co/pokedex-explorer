import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';

export default function DetailScreen ({ route, navigation }) {

    const { dataPokemon } = route.params;

    return (
        <View>
            <Image source={{ uri: dataPokemon.image }} style={styles.image} />
            <Text>{dataPokemon.name}</Text>
            <Text>#{String(dataPokemon.id).padStart(3, '0')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 20,
    },
});