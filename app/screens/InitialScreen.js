import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { getData } from '../services/Service';
import Constants from '../constants/Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        color: Constants.white_color,
        paddingTop: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        color: Constants.white_color,
        fontFamily: 'Lato_black',
        padding: 10
    },
});

export default class InitialScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Dev4All',
        headerStyle: {
            backgroundColor: Constants.main_color,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato_black',
        },
    }

    state = {
        users: [],
    }

    componentDidMount() {
        const promise = getData('http://dev.4all.com:3003/tarefa');
        promise.then(data => this.setState({ users: data.lista }));
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    horizontal={false}
                    numColumns={1}
                    data={this.state.users}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => this.props.navigation.navigate('Main', { item: item })}><Text style={styles.text}>{item}</Text></TouchableOpacity>}
                />
            </View>
        )
    }
}