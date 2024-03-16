import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

export const fetchStorage = async (key) => {
    try {
        const pokemonStore = await AsyncStorage.getItem(key);
        if (pokemonStore !== null) {
            return JSON.parse(pokemonStore);
        }
        return null;
    } catch (error) {
        console.log('error');
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
    }
};

export const storePokemon = async (key, pokemonToStore) => {
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(pokemonToStore),
        );
    } catch (error) {
    }
};

export const updateManager = () => {
    const [hasUpdate, setHasUpdate] = useState(false);

    const updateState = () => {
        setHasUpdate(hasUpdate!==true);
    }

    return {
        hasUpdate,
        updateState
    }
}
