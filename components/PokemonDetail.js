import React from 'react';
import { View, Text } from 'react-native';

export default function PokemonDetail({ route }) {
    const { pokemon } = route.params;

    return (
        <View>
            <Text>{pokemon.name}</Text>
            <Text>test</Text>
        </View>
    );
}
