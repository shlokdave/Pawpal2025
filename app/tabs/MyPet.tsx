import { View, Text, StyleSheet } from 'react-native';

export default function MyPetScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>🐶 My Pet Profile</Text>
            <Text style={styles.subtext}>Add your pet to get started.</Text>
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
        fontSize: 22,
        color: '#2D6063',
        fontWeight: '600',
    },
    subtext: {
        fontSize: 14,
        color: '#2D6063',
        marginTop: 10,
    },
});
