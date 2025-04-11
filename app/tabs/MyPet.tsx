import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MyPetScreen() {
    const { imageUri, breed } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>🐶 My Pet Profile</Text>

            {imageUri ? (
                <Image source={{ uri: imageUri as string }} style={styles.image} />
            ) : (
                <Text style={styles.subtext}>No image available.</Text>
            )}

            {breed ? (
                <Text style={styles.breed}>Breed: {breed}</Text>
            ) : (
                <Text style={styles.subtext}>No breed identified.</Text>
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
        padding: 20,
    },
    text: {
        fontSize: 22,
        color: '#2D6063',
        fontWeight: '600',
    },
    subtext: {
        fontSize: 14,
        color: '#2D6063',
        marginTop: 10,
    },
    breed: {
        fontSize: 18,
        color: '#2D6063',
        marginTop: 12,
        fontWeight: '500',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 12,
        marginTop: 20,
    },
});
