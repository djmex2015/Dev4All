import React, { Component } from 'react';
import MainScreen from './app/screens/MainScreen';
import ServicesScreen from './app/screens/ServicesScreen';
import InitialScreen from './app/screens/InitialScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { View, Dimensions } from 'react-native';

const RootStack = createStackNavigator({
  Initial: { screen: InitialScreen },
  Main: { screen: MainScreen },
  Services: { screen: ServicesScreen },
  Options: { screen: ServicesScreen },
}, {
    initialRouteName: 'Initial',
    headerLayoutPreset: 'center', // default is 'left'
  }
)

class App extends Component {
  render() {
    return (
      <View style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }}>
        <Navigator />
      </View>

    );
  }
}

export default createAppContainer(RootStack);