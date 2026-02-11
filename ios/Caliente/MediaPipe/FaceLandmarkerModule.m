#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(FaceLandmarkerModule, NSObject)

RCT_EXTERN_METHOD(detectFace:(NSString *)imageData
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end