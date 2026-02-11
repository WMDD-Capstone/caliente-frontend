package com.caliente

import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.*
import com.google.mediapipe.framework.image.BitmapImageBuilder
import com.google.mediapipe.tasks.core.BaseOptions
import com.google.mediapipe.tasks.vision.facelandmarker.FaceLandmarker


class FaceLandmarkerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var faceLandmarker: FaceLandmarker? = null

    override fun getName(): String = "FaceLandmarkerModule"

    init {
        setupLandmarker(reactContext)
    }

    private fun setupLandmarker(context: ReactApplicationContext) {
        try {
            val baseOptions = BaseOptions.builder()
                .setModelAssetPath("face_landmarker.task")
                .build()

            val options = FaceLandmarker.FaceLandmarkerOptions.builder()
                .setBaseOptions(baseOptions)
                .setNumFaces(1)
                .setMinFaceDetectionConfidence(0.5f)
                .setMinFacePresenceConfidence(0.5f)
                .setMinTrackingConfidence(0.5f)
                .setOutputFaceBlendshapes(true)
                .setRunningMode(com.google.mediapipe.tasks.vision.core.RunningMode.IMAGE)
                .build()

            faceLandmarker = FaceLandmarker.createFromOptions(context, options)
            android.util.Log.d("MediaPipe", "FaceLandmarker initialized successfully")
        } catch (e: Exception) {
            android.util.Log.e("MediaPipe", "Failed to initialize: ${e.message}")
        }
    }

    @ReactMethod
    fun detectFace(imageData: String, promise: Promise) {
        try {
            val landmarker = faceLandmarker
            if (landmarker == null) {
                promise.reject("ERROR", "FaceLandmarker not initialized")
                return
            }

            val decodedBytes = Base64.decode(imageData, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
            if (bitmap == null) {
                promise.reject("ERROR", "Invalid image data")
                return
            }

            val mpImage = BitmapImageBuilder(bitmap).build()
            val result = faceLandmarker!!.detect(mpImage)

            val response = Arguments.createMap()
            response.putBoolean("detected", false)
            response.putInt("landmarkCount", 0)

            if (result.faceLandmarks().isNotEmpty()) {
                val face = result.faceLandmarks()[0]
                response.putBoolean("detected", true)
                response.putInt("landmarkCount", face.size)

                val landmarks = Arguments.createArray()
                val keyIndices = intArrayOf(1, 4, 5, 6, 10, 33, 133, 152, 263, 362, 468, 473)
                for (index in keyIndices) {
                    if (index < face.size) {
                        val lm = face[index]
                        val point = Arguments.createMap()
                        point.putInt("index", index)
                        point.putDouble("x", lm.x().toDouble())
                        point.putDouble("y", lm.y().toDouble())
                        point.putDouble("z", lm.z().toDouble())
                        landmarks.pushMap(point)
                    }
                }
                response.putArray("landmarks", landmarks)
            }

            val blendshapeMap = Arguments.createMap()
            if (result.faceBlendshapes().isPresent && result.faceBlendshapes().get().isNotEmpty()) {
                val blendshapes = result.faceBlendshapes().get()[0]
                for (category in blendshapes) {
                    blendshapeMap.putDouble(
                        category.categoryName() ?: "unknown",
                        category.score().toDouble()
                    )
                }
            }
            response.putMap("blendshapes", blendshapeMap)

            promise.resolve(response)
        } catch (e: Exception) {
            promise.reject("ERROR", "Detection failed: ${e.message}")
        }
    }
}
