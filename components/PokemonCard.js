import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function PokemonCard({ name, url }) {
    const navigation = useNavigation();
    const id = url.split("/")[url.split("/").length - 2];
    const [gameIndex, setGameIndex] = useState(null);

    useEffect(() => {
        const fetchGameIndex = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error('Failed to fetch game index');
                    return;
                }
                const data = await response.json();
                setGameIndex(data.sprites.front_default);
            } catch (error) {
                console.error('Error fetching game index:', error);
            }
        };

        fetchGameIndex();
    }, [url]);


    return (
        <View style={styles.card}
        >
            {gameIndex !== null ? (
                <Image style={styles.image} source={{ uri: gameIndex }} />
            ) : (
                <Image source={require('../assets/pokeball.png')} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 150,
    },
});
