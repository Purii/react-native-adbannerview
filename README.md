# react-native-adbannerview
[![npm version](http://img.shields.io/npm/v/react-native-adbannerview.svg?style=flat-square)](https://www.npmjs.com/package/react-native-adbannerview)

This component serves as a bridge for ADBannerview.
Feel free to contribute :-)

## Installation
1. `npm install react-native-adbannerview --save`
1. Xcode: Right click `Libraries` ➜ `Add Files to [project]`
1. Choose `node_modules/react-native-adbannerview/lib/ADBannerViewManager.xcodeproj`
1. Xcode: Select the project in the navigator and add the library to the `Build Phases` ➜ `Link Binary With Libraries` (`libADBannerViewManager.a`)

See: http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content (Step 1 + 2)

## Usage
```javascript
var ADBannerView = require('react-native-adbannerview');

...

<ADBannerView />
```
The bannerview only appears, when an ad has been loaded successfully.
Check the example below, where an additional View-Component is used to display the ADBannerView properly.

## Props
| Event  | Description |
| :------------ | :---------------:|
| didFailToReceiveAdWithError | Error loading banner |
| willLoadAd | Before a new banner ad is loaded |
| didLoadAd | When a new banner ad is loaded |
| actionDidFinish | After banner view finishes executing an action |

## Example
![](https://raw.githubusercontent.com/Purii/react-native-adbannerview/master/screenshot.png)
```javascript
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
```

## Known Issues
* The component doesn't resize after a device orientation change