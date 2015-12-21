#import <iAd/iAd.h>

#import "ADBannerViewManager.h"

#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"

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
    NSDictionary *event = @{
        @"eventName": @"didFailToReceiveAdWithError"
    };
    [self.bridge.eventDispatcher sendAppEventWithName:@"ADBannerView" body:event];
}

// Before a new banner ad is loaded
- (void)bannerViewWillLoadAd:(ADBannerView *)banner
{
    NSDictionary *event = @{
        @"eventName": @"willLoadAd"
    };
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"ADBannerView" body:event];
}


// When a new banner ad is loaded
- (void)bannerViewDidLoadAd:(ADBannerView *)banner
{
    NSDictionary *event = @{
        @"eventName": @"didLoadAd"
    };
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"ADBannerView" body:event];
    
}


// After banner view finishes executing an action
- (void)bannerViewActionDidFinish:(ADBannerView *)banner
{
    NSDictionary *event = @{
        @"eventName": @"actionDidFinish"
    };
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"ADBannerView" body:event];
    
}

@end