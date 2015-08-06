# react-native-adbannerview
This bridge provides ADBannerview for your React Native app.
Feel free to contribute, if you find something wrong.
So far the component is not used in production -- so please, be kind :-)

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
Also check the example below, with an additional view-wrapper.

## Props
| Event  | Description |
| :------------ | :---------------:|
| didFailToReceiveAdWithError | Error loading banner |
| willLoadAd | Before a new banner ad is loaded |
| didLoadAd | When a new banner ad is loaded |
| actionDidFinish | After banner view finishes executing an action |

## Example
![](https://github.com/Purii/react-native-adbannerview/blob/master/screenshot.png)
```javascript
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ADBannerView = require('react-native-adbannerview');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

class helloworld extends React.Component {

  render() {
    var didLoadAd = function() { console.log('Ad loaded') };
    var didFailToReceiveAdWithError = function() { console.log('Error loading ad') };

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
        <ADBannerView didLoadAd={didLoadAd} didFailToReceiveAdWithError={didFailToReceiveAdWithError} />
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

AppRegistry.registerComponent('helloworld', () => helloworld);
```

## Known Issues
* The component doesn't resize after a device orientation change