import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from "@rneui/base";
import StorageModalButton from "./storageModalButton";

export default function PokemonDetail({ route }) {
    const { pokemon } = route.params;
    const [imageLoaded, setImageLoaded] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const localStorageKeys = ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6'];

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const renderHealthBar = (hp) => {
        let healthPercentage = (hp / 100) * 100;
        if (healthPercentage > 60) {
            healthPercentage = 85;
        }
        return (
            <View style={styles.barreVie}>
                <View style={[styles.healthBar, { width: healthPercentage + '%' }]} />
                <Text style={styles.healthText}>{hp} HP</Text>
                <View style={styles.healthBarContainer}>
                </View>
            </View>
        );
    };

    const modal = (keysArray) => {
        return (
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Manage your team</Text>
                    <View style={styles.modalButtonsContainer}>
                        {
                            keysArray.map((key) => {
                                return (
                                    <StorageModalButton
                                        currentPokemon={pokemon}
                                        currentKey={key}
                                    />
                                )
                            })
                        }

                    </View>
                    <Button
                        title={'Close'}
                        onPress={() => setOpenModal(!openModal)}
                        buttonStyle={styles.modalCloseButton}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button
                title={'Add to team'}
                buttonStyle={styles.teamButton}
                containerStyle={styles.teamButtonContainer}
                onPress={() => {
                    setOpenModal(!openModal)
                }}
            />
            <View style={styles.header}>
                <View style={styles.pokeImg}>
                    <Image
                        style={styles.image}
                        source={{ uri: pokemon.sprites.front_default }}
                    />
                    <Image
                        style={styles.image}
                        source={{ uri: pokemon.sprites.back_default }}
                    />
                </View>
                <Text style={styles.name}>{pokemon.name}</Text>
            </View>
            <Text>{renderHealthBar(pokemon.stats[0].base_stat)}</Text>
            <View style={styles.typesContainer}>
                {pokemon.types.map((typeSlot) => (
                    <Text
                        key={typeSlot.type.name}
                        style={[styles.typeText, { backgroundColor: getTypeColor(typeSlot.type.name) }]}
                    >
                        {typeSlot.type.name}
                    </Text>
                ))}
            </View>
            <Text>Weight: {pokemon.weight}</Text>
            <Text>Height: {pokemon.height}</Text>
            {
                openModal && modal(localStorageKeys)
            }
        </View>
    );
}

const getTypeColor = (type) => {
    switch (type) {
        case 'normal':
            return '#A8A878'; // Gray
        case 'steel':
            return '#B8B8D0'; // Light Gray
        case 'fighting':
            return '#C03028'; // Red
        case 'dragon':
            return '#7038F8'; // Purple
        case 'water':
            return '#6890F0'; // Blue
        case 'electric':
            return '#F8D030'; // Yellow
        case 'fairy':
            return '#EE99AC'; // Pink
        case 'fire':
            return '#F08030'; // Orange
        case 'ice':
            return '#98D8D8'; // Cyan
        case 'bug':
            return '#A8B820'; // Olive Green
        case 'grass':
            return '#78C850'; // Light Green
        case 'poison':
            return '#A040A0'; // Dark Purple
        case 'psychic':
            return '#F85888'; // Dark Pink
        case 'rock':
            return '#B8A038'; // Brown
        case 'ground':
            return '#E0C068'; // Dark Yellow
        case 'ghost':
            return '#705898'; // Dark Purple
        case 'dark':
            return '#705848'; // Dark Brown
        case 'flying':
            return '#A890F0'; // Light Purple
        case 'unknown':
            return '#68A090'; // Bluish Green
        case 'shadow':
            return '#705848'; // Dark Brown
        case 'stellar':
            return '#B8A038'; // Brown (used as an example, you can choose another color)
        default:
            return '#A8A878'; // Default color
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    pokeImg: {
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
        paddingBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
    },
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    typeText: {
        marginHorizontal: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 5,
        color: '#fff',
        marginBottom: 16,
    },
    barreVie: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        minWidth: '100%',
    },
    healthBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    healthBar: {
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4CAF50', // Green color for HP bar
        marginRight: 8,
    },
    healthText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    teamButtonContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    teamButton: {
        backgroundColor: '#E4000F',
        borderRadius: 10,
        marginTop: 20,
        padding: 20,
    },
    modalBackground: {
        backgroundColor: 'rgba(217,217,217,0.7)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: '80%',
        position: 'absolute',
        zIndex: 110,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        gap: 25
    },
    modalTitle: {
        color: '#4C666B',
        fontWeight: '600',
        fontSize: 20,
    },
    modalButtonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    },
    modalCloseButton: {
        borderRadius: 5,
        backgroundColor: '#E4000F'
    },
});