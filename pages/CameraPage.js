import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import {Camera, CameraType} from "expo-camera";

export default function CameraPage({navigation}) {
    const [type, setType] = useState(CameraType.back);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <>
            <View style={styles.container}>
                <Camera style={styles.camera} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text>Flip</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        </>
    );
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    global: {
        flex: 1,
        height: height,
        paddingTop: 20,
        paddingHorizontal: 10
    },
    container: {
        height: '95%'
    },
    camera: {
        height: '100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 30
    },
    buttonContainer: {
        backgroundColor: '#fff',
        borderRadius: 2000
    },
    picture: {
        height: 60,
        width: 60
    }
});
