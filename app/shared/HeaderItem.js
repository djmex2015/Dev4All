import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: 'white'
    }
});

const HeadertItem = ({ cidade, bairro }) => {
    return <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Entypo name='location-pin'
            style={{ padding: 5 }}
            color='white'
            size={25} /><Text style={styles.text}>{`${cidade} - ${bairro}`}</Text>
    </View>
};

export default HeadertItem;