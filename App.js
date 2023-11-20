import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './components/CustomButton';

export default function App() {
    const [text, setText] = useState('Rien');

    const changeText = (newText) => {
        setText(newText);
    }

    return (
        <View style={styles.container}>
            <Text>J'ai cliqué sur {text}</Text>
            <CustomButton
                text={'MARRON'}
                changeText={changeText}
                color={'brown'}
            />
            <CustomButton
                text={'NOIR'}
                changeText={changeText}
                color={'black'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
