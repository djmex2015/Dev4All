import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, FlatList } from 'react-native';
import server from '../../dummy';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import HeaderItem from '../shared/HeaderItem';
import { withNavigation } from 'react-navigation';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GoogleStaticMap from 'react-native-google-static-map';
import { ScrollView } from 'react-native-gesture-handler';
import OptionsBar from '../shared/OptionsBar';
import Comments from '../shared/Comments';
import { Divider } from 'react-native-elements';
import Constants from '../constants/Constants';
import { getData } from '../services/Service';
import PropTypes from 'prop-types';
import Config from '../constants/Configuration';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
    },
    barLogo: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    barTitle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10

    },
    barMap: {
        flexDirection: 'row',
        backgroundColor: Constants.main_color,
        height: 20,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    titulo: {
        color: Constants.main_color,
        fontSize: 25,
        flexDirection: 'row'
    }
});

class MainScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: { flex: 1, justifyContent: 'center' },
        headerTitle: <HeaderItem cidade={server.data.cidade} bairro={server.data.bairro}></HeaderItem>,
        headerRight: <Foundation name='magnifying-glass'
            style={{ paddingHorizontal: 10 }}
            size={25}
            color='white' />,
        headerBackImage: <Entypo name='triangle-left'
            size={35}
            color='white' />,
        headerStyle: {
            backgroundColor: Constants.main_color,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Lato_black',
        }
    }

    state = {
        data: {},
    }

    componentDidMount() {
        var item = this.props.navigation.getParam('item');
        const promise = getData(Config.api_key_static_map + item);
        promise.then(data => this.setState({ data: data }));
    }

    scrollToComments = () => {
        this.refs._scrollView.scrollTo({ y: this.state.y });
    }

    render() {
        const { urlFoto, urlLogo, titulo, telefone, texto, endereco, latitude, longitude, comentarios } = this.state.data;

        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} ref="_scrollView">
                    {/* Foto Principal + Logo*/}
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1, width: null, height: Dimensions.get('screen').height * 0.30 }} source={{ uri: urlFoto }}>
                            <View style={styles.barLogo}>
                                <ImageBackground style={{
                                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                                    width: Dimensions.get('window').width * 0.2,
                                    height: Dimensions.get('window').width * 0.2,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: -30
                                }}>
                                    <Image source={{ uri: urlLogo }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 80,
                                        width: 80
                                    }}></Image>
                                </ImageBackground>

                            </View>
                        </ImageBackground>
                    </View>
                    {/* End Foto Principal + Logo*/}
                    {/* Barra Titulo */}
                    <View style={styles.barTitle}>
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>
                    {/* End Barra Titulo */}
                    <View style={{ backgroundColor: 'white' }}>
                        {/* Start OptionBar */}
                        <OptionsBar endereco={endereco} phone={telefone} scrollToComments={() => this.scrollToComments()} />
                        {/* End OptionBar */}
                        <View style={{ justifyContent: 'center', paddingHorizontal: 30 }}>
                            <Divider style={{ backgroundColor: 'blue' }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                            <Text style={{ paddingVertical: 5 }}>{texto}</Text>
                        </View>
                        {/* Map */}
                        <GoogleStaticMap
                            latitude={latitude ? latitude.toString() : '0'}
                            longitude={longitude ? longitude.toString() : '0'}
                            zoom={13}
                            size={{ width: Math.round(Dimensions.get('window').width), height: 100 }}
                            apiKey={Config.api_key_static_map}
                        />
                        <View style={styles.barMap}>
                            <Text style={{ fontSize: 10, color: 'white', paddingHorizontal: 10 }}>{endereco}</Text>
                            <Image style={{ marginBottom: 20 }} source={Constants.location_logo} />
                        </View>
                        {/*End Map */}

                        {comentarios && comentarios.length > 0 &&
                            <View onLayout={(event) => {
                                const { y } = event.nativeEvent.layout;
                                this.setState({ y })
                            }}>
                                {/* User Comentarios */}
                                <FlatList
                                    horizontal={false}
                                    numColumns={1}
                                    data={comentarios}
                                    keyExtractor={(item) => item.nome}
                                    renderItem={({ item }) => <Comments nome={item.nome} titulo={item.titulo} nota={item.nota} comentario={item.comentario} urlFoto={item.urlFoto}></Comments>}
                                />
                                {/* End User Comentarios */}
                            </View>}
                    </View >
                </ScrollView>
            </View >
        );
    }
}

MainScreen.propTypes = {
    urlFoto: PropTypes.string,
    urlLogo: PropTypes.string,
    titulo: PropTypes.string,
    telefone: PropTypes.string,
    texto: PropTypes.string,
    endereco: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
};

MainScreen.defaultProps = {
    urlFoto: '',
    urlLogo: '',
    titulo: '',
    telefone: '',
    texto: '',
    endereco: '',
    latitude: 0,
    longitude: 0,
};

export default withNavigation(MainScreen);