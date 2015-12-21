/**
 * @providesModule ADBannerView
 * @flow
 */
import React, {
  Component,
  requireNativeComponent,
  NativeAppEventEmitter,
  StyleSheet,
  Dimensions
} from 'react-native';

/* See: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/iAd_Guide/BannerAdvertisements/BannerAdvertisements.html*/
const styles = StyleSheet.create({
  isHidden: {
    height: 0,
    opacity: 0
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
      isLandscape: false
    }
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  /** Register EventEmitter **/
  componentDidMount() {
    this.subscriptionBannerView = NativeAppEventEmitter.addListener(
      'ADBannerView', (response) => this.handleBannerEvent(response));
  }

  /** Cancel EventEmitter **/
  componentWillUnmount() {
    this.subscriptionBannerView.remove();
  }

  /** Handle Events **/
  handleBannerEvent(event) {
    /*** Internal handling ***/
    switch (event.eventName) {
      case "didFailToReceiveAdWithError":
        this.setState({
          isHidden: true
        });
        break;
      case "didLoadAd":
        this.setState({
          isHidden: false
        });
        break;
      default:
        //console.warn('react-native-adbannerview | Unknown event: ' + event.eventName);
        break;
    }

    /*** External handling through props ***/
    if (typeof this.props[event.eventName] === 'function') {
      this.props[event.eventName]();
    } else if(__DEV__) {
      console.warn('react-native-adbannerview: No property provided to handle event *' + event.eventName + '*');
    }
  }

  handleLayoutChange(event: Event) {
    const isLandscape = event.nativeEvent.layout.width > Dimensions.get('window').width;
    this.setState({
      isLandscape
    })
  }

  render() {
    const { isLandscape, isHidden } = this.state;
    let style;
    if(isHidden) {
      style = styles.isHidden;
    } else if(isLandscape) {
      style = styles.isLandscape_iphone;
    } else {
      style = styles.isPortrait_iphone;
    }
    return <NativeADBannerView style={style} onLayout={this.handleLayoutChange}/>;
  }
}

var NativeADBannerView = requireNativeComponent('ADBannerView', null);

export default ADBannerView;