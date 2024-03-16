import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Home from "./pages/Home";
import Search from "./pages/Search";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons, AntDesign, FontAwesome, Entypo, Feather, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import 'react-native-gesture-handler';
import PokemonDetail from "./components/PokemonDetail";
import {createStackNavigator} from "@react-navigation/stack";
import Camera from "./pages/CameraPage";


export default function App() {
    // const [text, setText] = useState('Rien');
    // const changeText = (newText) => {
    //     setText(newText);
    // }

    const Stack = createStackNavigator();

    function MyStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home " options={{headerShown: false}} component={Home}/>
                <Stack.Screen name="Characteristics"
                              options={{
                                  headerTintColor: 'black',
                              }}
                              component={PokemonDetail}/>
            </Stack.Navigator>
        );
    }

    function TeamStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Team "
                              options={{
                                  headerTintColor: 'black',
                              }} component={Team}/>
            </Stack.Navigator>
        );
    }

    function SearchStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Search " component={Search}/>
                <Stack.Screen name="Characteristics"
                              options={{
                                  headerTintColor: 'black',
                              }}
                              component={PokemonDetail}/>
            </Stack.Navigator>
        );
    }

    function ProfileStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile "
                              options={{
                                  headerTintColor: 'black',
                              }}
                              component={Profile}/>
                <Stack.Screen name="Camera"
                              options={{
                                  headerTintColor: 'black',
                              }}
                              component={Camera}/>
            </Stack.Navigator>
        );
    }

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let iconColor = focused ? '#FF1F1F' : 'black';
                        if (route.name === 'Home') {
                            return focused ? <Entypo name="home" size={24} color={iconColor}/> :
                                <AntDesign name="home" size={24} color={iconColor}/>;
                        } else if (route.name === 'Search') {
                            return focused ? <FontAwesome name="search" size={24} color={iconColor}/> :
                                <AntDesign name="search1" size={24} color={iconColor}/>;
                        } else if (route.name === 'Team') {
                            return focused ? <FontAwesome5 name="user-friends" size={24} color={iconColor}/> :
                                <Feather name="users" size={24} color={iconColor}/>;
                        } else if (route.name === 'Profile') {
                            return focused ? <FontAwesome name="drivers-license" size={24} color={iconColor}/> :
                                <FontAwesome name="id-card-o" size={24} color={iconColor}/>;
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#FF1F1F',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={MyStack}/>
                <Tab.Screen name="Team" component={TeamStack}/>
                <Tab.Screen name="Profile" component={ProfileStack}/>
                <Tab.Screen name="Search" component={SearchStack}/>
            </Tab.Navigator>
        </NavigationContainer>
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
