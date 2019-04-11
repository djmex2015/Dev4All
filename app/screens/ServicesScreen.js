import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import server from '../../dummy';
import HeaderItem from '../shared/HeaderItem';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Constants from '../constants/Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        color: '#000000',
        paddingTop: 20,

    },
});

export default class ServicesScreen extends React.Component {
    static navigationOptions = {
        headerTitle: <HeaderItem cidade={server.data.cidade} bairro={server.data.bairro}></HeaderItem>,
        headerRight: <Foundation name='magnifying-glass'
            style={{ padding: 10 }}
            size={25}
            color='white' />,
        headerBackImage: <Entypo name='triangle-left'
            size={35}
            color='white' />,
        headerStyle: {
            backgroundColor: Constants.main_color,
        },
        headerTintColor: Constants.white_color,
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato_black',
        },
    }

    render() {
        return (
            <View style={styles.container}>{}
                <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold' }}>Servicos</Text>
            </View>
        );
    }
}