import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

export default function Home() {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const responseData = await resp.json();

            const detailedData = await Promise.all(
                responseData.results.map(async (pokemon) => {
                    const detailResp = await fetch(pokemon.url);
                    return detailResp.json();
                })
            );

            setData(detailedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        getData().then(() => console.log('data fetched'));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
                <Image style={styles.image} source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png` }} />
                {/*<Image style={styles.imageLoading} source={require('../assets/pokeball.png')} />*/}
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Image style={styles.pokedexTitle} source={require('../assets/pokedex.png')} />
                <Text style={styles.title}>CAUGHT : 999   SEEN : 999</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id} // Use ID as key
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    banner: {
        paddingTop: 60,
        backgroundColor: '#f3f3f3',
        padding: 16,
        borderRadius: 8,
    },
    pokedexTitle: {
        width: 300,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        fontSize: 13,
        textAlign: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 10,
        padding: 12,
        width: '50%',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        width: '90%',
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageLoading: {
        width: 400,
        height: 100,
    },
});
