import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import RatingItem from '../shared/RatingItem';
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', padding: 20
    },
});

const Comments = ({ nome, titulo, nota, comentario, urlFoto }) => {
    if (nota > 5) {
        console.warn("NOTA must be less or equal than 5");
    }
    return (
        <View>
            <View style={styles.container}>
                <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'flex-start', marginBottom: 15 }}>
                    <Image style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.2,
                        height: Dimensions.get('window').width * 0.2
                    }} source={{ uri: urlFoto }}></Image>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 2, flexDirection: 'column' }}>
                                <Text>{nome}</Text>
                                <Text>{titulo}</Text>
                            </View>
                            {/* Rating */}
                            <View style={{ flex: 1, alignContent: 'flex-end', marginTop: 10, textAlign: 'right' }}>
                                <RatingItem nota={nota}></RatingItem>
                            </View>
                            {/* End Rating */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={{ textAlign: 'left' }}>{comentario}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Divider style={{ backgroundColor: 'blue' }} />
        </View >
    )
}

Comments.propTypes = {
    name: PropTypes.string,
    titulo: PropTypes.string,
    nota: PropTypes.number,
    comentario: PropTypes.string,
    urlFoto: PropTypes.string,
};

Comments.defaultProps = {
    name: '',
    titulo: '',
    nota: 0,
    comentario: '',
    urlFoto: '',
};

export default Comments;