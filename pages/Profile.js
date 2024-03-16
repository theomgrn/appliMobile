import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button} from "@rneui/base";

export default function Profile({navigation}) {

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/profile.png')} // Assurez-vous de spécifier le chemin correct vers votre image de profil
                    style={styles.profileImage}
                />
                <Text style={styles.username}>Théo Maugran</Text>
                <Text style={styles.trainerLevel}>Trainer Level: 10</Text>
            </View>
            <Button
                title={'Change your profile picture'}
                buttonStyle={styles.changeButton}
                containerStyle={styles.changeButtonContainer}
                onPress={() => { navigation.navigate('Camera')}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    trainerLevel: {
        fontSize: 18,
        marginTop: 5,
    },
    changeButtonContainer: {
        marginTop: 20,
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
    },
    changeButton: {
        backgroundColor: '#E4000F',
        padding: 20,
    },
});
