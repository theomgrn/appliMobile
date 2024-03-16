import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PokemonCard from "../components/PokemonCard";

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonNotFound, setPokemonNotFound] = useState(false);
    const [searchInProgress, setSearchInProgress] = useState(false);

    const searchApi = async (text) => {
        setSearchInProgress(true);
        setPokemonNotFound(false);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${text.toLowerCase()}`);
            if (!response.ok) {
                setPokemonNotFound(true);
                return [];
            }
            setPokemonNotFound(false);
            const json = await response.json();
            setPokemon(json);
            return [json.name];
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            setSearchInProgress(false);
        }
    };

    const handleSearch = async (text) => {
        if (text) {
            const results = await searchApi(text);
            const filteredResults = results.filter(result =>
                result.toLowerCase().includes(text.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };


    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Write the whole name..."
                onChangeText={(text) => setSearchText(text)}
                onEndEditing={() => handleSearch(searchText)}
                value={searchText}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInputContainer}
                inputStyle={styles.searchBarInput}
            />
            {searchInProgress && (
                <Text style={styles.infoMessage}>Search in progress...</Text>
            )}
            {pokemonNotFound && (
                <Text style={styles.errorMessage}>Pokemon not found</Text>
            )}
            <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.resultItem}>
                        <PokemonCard name={item} url={`https://pokeapi.co/api/v2/pokemon/${item.toLowerCase()}/`} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    searchBarInput: {
        color: '#000',
    },
    resultItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoMessage: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Search;
