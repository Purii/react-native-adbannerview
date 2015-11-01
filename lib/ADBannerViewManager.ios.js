/**
 * @providesModule ADBannerView
 * @flow
 */
'use strict';

import React, {Component, requireNativeComponent, NativeAppEventEmitter, StyleSheet} from 'react-native';

var NativeADBannerView = requireNativeComponent('ADBannerView', null);

/* See: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/iAd_Guide/BannerAdvertisements/BannerAdvertisements.html*/
var styles = StyleSheet.create({
  adBannerView: {
  },
  isHidden: {
    height: 0
  },
  isPortrait_iphone: {
    height: 50,
  },
  isLandscape_iphone: {
    height: 32
  }
});


class ADBannerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      deviceOrientation: 'portrait'
    }
  }

  /** Register EventEmitter **/
  componentDidMount() {
    this.subscriptionBannerView = NativeAppEventEmitter.addListener(
      'BannerView', (response) => this._eventHandlerBannerView(response));
  }

  /** Cancel EventEmitter **/
  componentWillUnmount() {
    this.subscriptionBannerView.remove();
  }

  /** Handle Events **/
  _eventHandlerBannerView(event) {
    /*** Internal Handling ***/
    switch (event.eventName) {
      case "didFailToReceiveAdWithError":
        this.setState({isHidden: true});
        break;
      case "didLoadAd":
        this.setState({isHidden: false});
        break;
      default:
        //console.warn('react-native-adbannerview | Unknown event: ' + event.eventName);
        break;
    }

    /*** Props Handling ***/
    if (typeof this.props[event.eventName] === 'function') {
      this.props[event.eventName]();
    } else {
      console.log('react-native-adbannerview: No property provided to handle event *' + event.eventName + '*');
    }
  }

  render() {
    let style = [...{}, styles.adBannerView];

    if(this.state.deviceOrientation === 'landscape') {
      style = [...style, styles.isLandscape_iphone];
    } else if(this.state.deviceOrientation === 'portrait') {
      style = [...style, styles.isPortrait_iphone];
    }

    if(this.state.isHidden) {
      style = [...style, styles.isHidden];
    } else {
    }

    return <NativeADBannerView style={style}/>;
  }
}

module.exports = ADBannerView;