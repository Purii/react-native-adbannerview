#import <iAd/iAd.h>

#import "ADBannerViewManager.h"

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation ADBannerViewManager

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;
ADBannerView *_adBanner;

- (UIView *)view
{
    _adBanner = [[ADBannerView alloc] initWithFrame:CGRectZero];
    _adBanner.delegate = self;
    return _adBanner;
}

// Error loading banner
- (void)bannerView:(ADBannerView *)banner didFailToReceiveAdWithError:(NSError *)error
{
    NSString *eventName = @"didFailToReceiveAdWithError";
    [self.bridge.eventDispatcher sendAppEventWithName:@"BannerView" body:@{@"eventName": eventName}];
    return;
}

// Before a new banner ad is loaded
- (void)bannerViewWillLoadAd:(ADBannerView *)banner
{
    NSString *eventName = @"willLoadAd";
    [self.bridge.eventDispatcher sendAppEventWithName:@"BannerView" body:@{@"eventName": eventName}];
}


// When a new banner ad is loaded
- (void)bannerViewDidLoadAd:(ADBannerView *)banner
{
    NSString *eventName = @"didLoadAd";
    [self.bridge.eventDispatcher sendAppEventWithName:@"BannerView" body:@{@"eventName": eventName}];
    
}


// After banner view finishes executing an action
- (void)bannerViewActionDidFinish:(ADBannerView *)banner
{
    NSString *eventName = @"actionDidFinish";
    [self.bridge.eventDispatcher sendAppEventWithName:@"BannerView" body:@{@"eventName": eventName}];
    
}




@end
