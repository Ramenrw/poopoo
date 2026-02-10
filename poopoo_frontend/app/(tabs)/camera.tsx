import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.useButton} onPress={requestPermission}>
            <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8, // can adjust
        base64: false,
      });
      if (result?.uri) {
        setPhoto(result.uri);
      }
    }
  }

  function retakePicture() {
    setPhoto(null);
  }

  async function uploadPhoto() {
    if (!photo) return;
    setUploading(true);

    try {
      // Get token and API URL
      const token = await SecureStore.getItemAsync("auth_token");
      const API = process.env.EXPO_PUBLIC_API_URL;

      if (!token) {
        Alert.alert("Error", "You must be logged in to upload.");
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('image', {
        uri: photo,
        name: 'fridge_item.jpg',
        type: 'image/jpeg',
      } as any);

      // POST to backend (this will NOT work until you replace URL with your actual one. Run ipconfig and look for IPv4 address)
      // Note: If testing on phone, use your computer's local IP (e.g., 192.168.1.X). Looks something like http://YOUR_LOCAL_IP:5000/
      const response = await fetch(`${API}/api/items/upload-image`, {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data', // Note: Do not set Content-Type when using FormData; the browser will set it including the boundary.
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        Alert.alert("Success", "Items detected and added to your fridge!");
        setPhoto(null);
        router.push("/(tabs)/home");
      } else {
        Alert.alert("Error", "Failed to analyze image.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setUploading(false);
    }
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <View style={styles.previewControls}>
            {uploading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <>
                    <TouchableOpacity style={[styles.button, styles.retakeButton]} onPress={retakePicture}>
                        <Text style={styles.text}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.useButton]} onPress={uploadPhoto}>
                        <Text style={styles.text}>Use Photo</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
             <View style={styles.captureInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 64,
  },
  captureButton: {
    alignSelf: 'flex-end',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewControls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retakeButton: {
    backgroundColor: '#FF3B30',
  },
  useButton: {
    backgroundColor: '#34C759',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
