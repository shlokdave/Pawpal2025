import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebaseApp } from '../config/firebaseConfig';

export default function CreatePetScreen() {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const router = useRouter();

    const calculateAge = (birthDate: Date) => {
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImageAsync = async (uri: string, userId: string) => {
        const blob = await fetch(uri).then((res) => res.blob());
        const fileRef = ref(storage, `users/${userId}/pets/${Date.now()}.jpg`);
        await uploadBytes(fileRef, blob);
        return await getDownloadURL(fileRef);
    };

    const handleSubmit = async () => {
        if (!name || !breed || !image || !birthday) {
            Alert.alert('Please fill out all fields.');
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No user logged in.');

            const imageUrl = await uploadImageAsync(image, user.uid);
            const petId = `${Date.now()}`;
            const age = calculateAge(birthday);

            await setDoc(doc(db, `users/${user.uid}/pets/${petId}`), {
                name,
                breed,
                birthday: birthday.toISOString().split('T')[0],
                age,
                imageUrl,
                createdAt: new Date().toISOString(),
            });

            router.replace('/tabs/Home');
        } catch (error) {
            console.error('Error saving pet:', error);
            Alert.alert('Error', 'Could not save pet profile.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🐾 Create Your Pet's Profile</Text>

            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.imageText}>Tap to add photo</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Pet Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Breed"
                value={breed}
                onChangeText={setBreed}
            />

            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateText}>🎂 Birthday: {birthday.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={birthday}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) setBirthday(date);
                    }}
                />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5DC',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D6063',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    datePickerButton: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dateText: {
        fontSize: 16,
        color: '#444',
    },
    imagePicker: {
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: '#ddd',
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageText: {
        color: '#444',
    },
    image: {
        width: 120,
        height: 120,
    },
    submitButton: {
        backgroundColor: '#2D6063',
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
