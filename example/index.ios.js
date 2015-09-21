/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} = React;
var ADBannerView = require('react-native-adbannerview');

class Example extends Component {
  didLoadAd () {
    console.log('Ad loaded')
  }
  didFailToReceiveAdWithError() {
    console.log('Error loading ad')
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
        <ADBannerView didLoadAd={this.didLoadAd} didFailToReceiveAdWithError={this.didFailToReceiveAdWithError} />
      </View>
    );
  }
};

var styles = StyleSheet.create({
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

AppRegistry.registerComponent('example', () => Example);
