export const unstable_settings = {
    ssr: false,
};

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [CameraComponent, setCameraComponent] = useState<any>(null);
    const cameraRef = useRef<any>(null);

    // 🧠 Web fallback
    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>📷 Camera is not supported on web</Text>
            </View>
        );
    }

    useEffect(() => {
        (async () => {
            const cameraModule = await import('expo-camera');
            const { Camera } = cameraModule;
            setCameraComponent(() => Camera);
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedPhoto(photo.uri);
        }
    };

    if (!CameraComponent) {
        return (
            <View style={styles.container}>
                <Text>Loading camera...</Text>
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
            {!capturedPhoto ? (
                <>
                    <CameraComponent style={styles.camera} ref={cameraRef} />
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
