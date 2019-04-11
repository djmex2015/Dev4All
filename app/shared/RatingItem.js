import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';
import Constants from '../constants/Constants';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        padding: 1
    }
});

const RatingtItem = ({ nota }) => {
    if (nota <= 5) {
        var stars = [];
        for (let i = 0; i < nota; i++) {
            stars.push(<FontAwesome key={i} name='star' size={15} color={Constants.main_color} style={styles.star} />);
        }
        return <View style={styles.container}>{stars}</View>;
    }
};

export default RatingtItem;