import Foundation
import MediaPipeTasksVision

@objc(FaceLandmarkerModule)
class FaceLandmarkerModule: NSObject {

  private var faceLandmarker: FaceLandmarker?

  override init() {
    super.init()
    setupLandmarker()
  }

  private func setupLandmarker() {
    guard let modelPath = Bundle.main.path(forResource: "face_landmarker", ofType: "task") else {
      print("[MediaPipe] Model file not found")
      return
    }

    do {
      let options = FaceLandmarkerOptions()
      options.baseOptions.modelAssetPath = modelPath
      options.numFaces = 1
      options.minFaceDetectionConfidence = 0.5
      options.minFacePresenceConfidence = 0.5
      options.minTrackingConfidence = 0.5
      options.outputFaceBlendshapes = true

      faceLandmarker = try FaceLandmarker(options: options)
      print("[MediaPipe] FaceLandmarker initialized successfully")
    } catch {
      print("[MediaPipe] Failed to initialize: \(error)")
    }
  }

  @objc func detectFace(_ imageData: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    guard let landmarker = faceLandmarker else {
      reject("ERROR", "FaceLandmarker not initialized", nil)
      return
    }

    guard let data = Data(base64Encoded: imageData),
          let uiImage = UIImage(data: data),
          let mpImage = try? MPImage(uiImage: uiImage) else {
      reject("ERROR", "Invalid image data", nil)
      return
    }

    do {
      let result = try landmarker.detect(image: mpImage)

      var response: [String: Any] = [
        "detected": false,
        "landmarkCount": 0,
        "blendshapes": [:] as [String: Any]
      ]

      if let face = result.faceLandmarks.first {
        response["detected"] = true
        response["landmarkCount"] = face.count

        // Key landmarks
        var landmarks: [[String: Any]] = []
        let keyIndices = [1, 4, 5, 6, 10, 33, 133, 152, 263, 362, 468, 473]
        for index in keyIndices {
          if index < face.count {
            let lm = face[index]
            landmarks.append([
              "index": index,
              "x": lm.x,
              "y": lm.y,
              "z": lm.z
            ])
          }
        }
        response["landmarks"] = landmarks
      }

      if let blendshapes = result.faceBlendshapes.first {
        var blendshapeDict: [String: Any] = [:]
        for category in blendshapes.categories {
          blendshapeDict[category.categoryName ?? "unknown"] = category.score
        }
        response["blendshapes"] = blendshapeDict
      }

      resolve(response)
    } catch {
      reject("ERROR", "Detection failed: \(error.localizedDescription)", nil)
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
