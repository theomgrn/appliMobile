import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";
import {fetchStorage, storePokemon} from "./storageSetting";

export default function StorageModalButton({ currentPokemon, currentKey }) {
    const [pokemonStore, setPokemonStore] = useState(null);

    const fetchPokemonStore = async () => {
        setPokemonStore(await fetchStorage(currentKey));
    }

    useEffect(() => {
        fetchPokemonStore().then(r => r);
    }, [currentKey])

    return (
        <TouchableOpacity
            onPress={() => {
                storePokemon(currentKey, currentPokemon).then(r => r);
                fetchPokemonStore().then(r => r);
            }}
        >
            {
                pokemonStore ? (
                    <Text style={styles.pokemonName}>{pokemonStore.name}</Text>
                ) : (
                    <Image
                        style={styles.teamRefreshBtn}
                        source={require('../assets/plus.png')}
                    />
                )
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    teamRefreshBtn: {
        width: 50,
        height: 50,
    },
    pokemonName: {
        color: '#E4000F',
    }
});