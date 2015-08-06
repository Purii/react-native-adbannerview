/**
 * @providesModule ADBannerView
 * @flow
 */
'use strict';

var React = require('react-native');

var {
	requireNativeComponent,
	NativeAppEventEmitter,
	StyleSheet
} = React;


var NativeADBannerView = requireNativeComponent('ADBannerView', null);


/* See: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/iAd_Guide/BannerAdvertisements/BannerAdvertisements.html*/
var ADBannerViewStyles = StyleSheet.create({
  isHidden: {
    height: 0,
  },
	isPortrait_iphone: {
		height: 50,
	},
  isLandscape_iphone: {
    height: 32,
  }
})


class ADBannerView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      deviceOrientation: 'portrait'

    }
  }

  /** Register EventEmitter **/
	componentDidMount() {
		var subscriptionBannerView = NativeAppEventEmitter.addListener(
      'BannerView',
      (response) => this._eventHandlerBannerView(response)
    	);
	}

  /** Cancel EventEmitter **/
	componentWillUnmount() {
		subscriptionBannerView.remove();
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
          //console.log('Unknown event: ' + event.eventName);
          break;
      }

      /*** Props Handling ***/
      if( typeof this.props[event.eventName] === 'function' ) {
        this.props[event.eventName]();
      } else {
        //console.log(event.eventName + ' is not provided.');
      }
  }

  _getStyle() {
    if( this.state.isHidden ) {
      return ADBannerViewStyles.isHidden;
    } else if ( this.state.deviceOrientation === 'landscape' ) {
      return ADBannerViewStyles.isLandscape_iphone;
      } else {
      return ADBannerViewStyles.isPortrait_iphone;
    }
  }

  render() {
    let style = this._getStyle();
    return(
      <NativeADBannerView style={style}/>
      )
    }

}

module.exports = ADBannerView;
