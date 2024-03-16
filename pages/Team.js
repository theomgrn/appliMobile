import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {clearStorage, updateManager} from "../components/storageSetting";
import {Button} from "@rneui/base";
import TeamCard from "../components/TeamCard";

export default function Team({navigation}) {
    const localStorageKeys = ['Team1', 'Team2', 'Team3', 'Team4', 'Team5', 'Team6'];

    const {
        hasUpdate,
        updateState
    } = updateManager();

    return (
        <>
                <View style={styles.teamContainer}>
                    <View style={styles.teamButtonsContainer}>
                        <Button
                            title={'Clear Team'}
                            buttonStyle={styles.teamClearbtn}
                            containerStyle={styles.teamClearbtnContainer}
                            onPress={() => {
                                clearStorage().then(r => r);
                                updateState();
                            }}
                        />
                        <TouchableOpacity
                            style={styles.teamRefreshContainer}
                            onPress={() => {
                                updateState();
                            }}
                        >
                            <Image
                                style={styles.teamRefreshBtn}
                                source={require('../assets/refresh.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>
                            Click on the red button to reset the team, click on the one next to it to refresh it
                        </Text>
                    </View>
                    {
                        localStorageKeys.map((key, index) => {
                            return (
                                <TeamCard key={index} currentKey={key} hasUpdate={hasUpdate}/>
                            )
                        })
                    }
                </View>
        </>
    );
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    teamContainer: {
        height: '100%',
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
    },
    teamButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    teamClearbtnContainer: {
        borderRadius: 10,
        width: '75%'
    },
    teamClearbtn: {
        backgroundColor: '#E4000F',
        padding: 20,
    },
    teamRefreshBtn: {
        height: '100%',
        width: '100%',
    },
    teamRefreshContainer: {
        borderRadius: 10,
        height: 65,
        width: 70

    }
});