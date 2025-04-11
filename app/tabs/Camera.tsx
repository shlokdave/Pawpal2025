export const unstable_settings = {
    ssr: false,
};

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Camera, CameraView } from 'expo-camera';
import type { CameraView as CameraViewType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Mime from 'react-native-mime-types';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef<CameraViewType | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();

            if (!photo || !photo.uri) {
                console.warn('No photo captured');
                return;
            }

            setCapturedPhoto(photo.uri);
            setLoading(true);

            const fileUri = photo.uri;
            const mimeType = Mime.lookup(fileUri) || 'image/jpeg';

            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: 'dog.jpg',
                type: mimeType,
            } as any);

            try {
                const response = await fetch('http://192.168.86.22:8000/predict', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });



                const data = await response.json();
                console.log("🔥 Response from backend:", data);
                const breed = data.predictions[0].breed; // ✅ grab top result


                router.push(`/tabs/MyPet?imageUri=${encodeURIComponent(photo.uri)}&breed=${encodeURIComponent(breed)}`);
            } catch (error) {
                console.error('Prediction error:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>📷 Camera is not supported on web</Text>
            </View>
        );
    }

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting permission...</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#2D6063" />
            ) : !capturedPhoto ? (
                <>
                    <CameraView style={styles.camera} ref={cameraRef} />
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Ionicons name="camera-outline" size={32} color="#F5F5DC" />
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Image source={{ uri: capturedPhoto }} style={styles.preview} />
                    <TouchableOpacity style={styles.button} onPress={() => setCapturedPhoto(null)}>
                        <Text style={styles.buttonText}>Retake</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5DC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#2D6063',
    },
    camera: {
        width: '100%',
        height: '80%',
    },
    button: {
        backgroundColor: '#2D6063',
        padding: 16,
        borderRadius: 50,
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#F5F5DC',
        fontSize: 16,
        fontWeight: '600',
    },
    preview: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
    },
});
