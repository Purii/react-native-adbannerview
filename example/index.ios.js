/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ADBannerView from 'react-native-adbannerview';

class example extends Component {
  didLoadAd() {
    console.log('Ad loaded');
  }
  didFailToReceiveAdWithError() {
    console.log('Error loading ad');
  }
  render() {
    return (
      <View style={styles.stage}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
        <ADBannerView didLoadAd={this.didLoadAd} didFailToReceiveAdWithError={this.didFailToReceiveAdWithError} willLoadAd={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);
