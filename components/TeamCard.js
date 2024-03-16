import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { fetchStorage } from "./storageSetting";

export default function TeamCard({ currentKey, hasUpdate }) {
    const [pokemonStore, setPokemonStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPokemonStore = async () => {
        try {
            const data = await fetchStorage(currentKey);
            setPokemonStore(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPokemonStore();
    }, [currentKey, hasUpdate]);

    if (loading) {
        return <Image style={styles.imageLoading} source={require('../assets/pokeball.png')} />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.team}>
            <View style={styles.teamCard}>
                {pokemonStore ? <Image style={styles.pokemonImage} source={{ uri: pokemonStore.sprites.front_default }} /> : <Image style={styles.imageNoPokemon} source={require('../assets/pokeball.png')} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    team: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    teamCard: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokemonImage: {
        width: 100,
        height: 100
    },
    imageLoading: {
        width: 100,
        height: 100
    },
    imageNoPokemon: {
        width: 120,
        height: 120
    }
});
