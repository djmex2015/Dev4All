import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, StyleSheet, Text, TouchableHighlight, Alert } from 'react-native';
import call from 'react-native-phone-call'
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import Constants from '../constants/Constants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    icon: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 10
    }
});

const phoneCall = (args) => { call(args).catch(console.error) }

const alertMessage = (endereco) => {
    Alert.alert(
        'Endereco',
        endereco,
        [
            { text: 'OK' },
        ],
        { cancelable: false },
    );
}

class OptionsBar extends Component {

    updateParent = () => {
        this.props.scrollToComments();
    }

    render() {
        const { phone, endereco } = this.props;
        // Call configuration
        args = {
            number: phone,
            prompt: false
        }
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => { phoneCall(args) }}>
                    <View style={styles.icon}>
                        <FontAwesome name='phone'
                            size={25}
                            color={Constants.main_color} />
                        <Text style={styles.text}>Ligar</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this.props.navigation.navigate('Services') }}>
                    <View style={styles.icon}>
                        <SimpleLineIcons name='diamond'
                            size={25}
                            color={Constants.main_color} />
                        <Text style={styles.text}>Servicos</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { alertMessage(endereco) }}>
                    <View style={styles.icon}>
                        <Entypo name='location-pin'
                            size={30}
                            color={Constants.main_color} />
                        <Text style={styles.text}>Endereco</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this.updateParent() }}>
                    <View style={styles.icon}>
                        <FontAwesome name='comments'
                            size={25}
                            color={Constants.main_color} />
                        <Text style={styles.text}>Comentarios</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.icon}>
                    <FontAwesome name='star'
                        size={25}
                        color={Constants.main_color} />
                    <Text style={styles.text}>Favoritos</Text>
                </View>
            </View >)
    }
};

OptionsBar.propTypes = {
    phone: PropTypes.string,
    endereco: PropTypes.string,
}

OptionsBar.defaultProps = {
    phone: '0',
    endereco: '',
};

export default withNavigation(OptionsBar);