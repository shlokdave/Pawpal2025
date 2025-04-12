import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PET_PROFILE_KEY = 'petProfile';

export default function MyPetScreen() {
    const { imageUri, breed } = useLocalSearchParams<{ imageUri?: string; breed?: string }>();

    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [notes, setNotes] = useState('');
    const [savedImageUri, setSavedImageUri] = useState<string | null>(null);
    const [savedBreed, setSavedBreed] = useState<string | null>(null);

    // Load saved profile when component mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const savedProfile = await AsyncStorage.getItem(PET_PROFILE_KEY);
                if (savedProfile) {
                    const profile = JSON.parse(savedProfile);
                    setPetName(profile.name);
                    setPetAge(profile.age);
                    setNotes(profile.notes);
                    setSavedImageUri(profile.imageUri);
                    setSavedBreed(profile.breed);
                } else {
                    // If no saved profile, use data from navigation
                    setSavedImageUri(imageUri || null);
                    setSavedBreed(breed || null);
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };
        loadProfile();
    }, []);

    const saveProfile = async () => {
        try {
            const profile = {
                name: petName,
                age: petAge,
                notes,
                imageUri: savedImageUri,
                breed: savedBreed,
            };
            await AsyncStorage.setItem(PET_PROFILE_KEY, JSON.stringify(profile));
            Alert.alert('Success', 'Pet profile saved successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to save profile.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>🐶 My Pet Profile</Text>

            {savedImageUri && <Image source={{ uri: savedImageUri }} style={styles.petImage} />}

            <Text style={styles.label}>Predicted Breed:</Text>
            <Text style={styles.breed}>{savedBreed || 'Unknown'}</Text>

            <Text style={styles.label}>Pet Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your pet's name"
                value={petName}
                onChangeText={setPetName}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your pet's age"
                value={petAge}
                onChangeText={setPetAge}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Any special notes?"
                value={notes}
                onChangeText={setNotes}
                multiline
            />

            <Button title="Save Pet Profile" onPress={saveProfile} color="#2D6063" />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5DC',
        flexGrow: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D6063',
        marginBottom: 20,
        textAlign: 'center',
    },
    petImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        color: '#2D6063',
    },
    breed: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 20,
        color: '#444',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        fontSize: 16,
    },
});
