// app/tabs/Home.tsx
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function NewHomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>🐾 PawPal</Text>
            <Text style={styles.welcome}>Welcome to PawPal!</Text>
            <Text style={styles.tipTitle}>Daily Tip:</Text>
            <Text style={styles.tipContent}>Keep your pup hydrated during long walks!</Text>

            <Text style={styles.info}>🎉 5 days until Scoot's birthday</Text>
            <Text style={styles.info}>🩺 Checkup due in 12 days</Text>

            <View style={styles.buttonRow}>
                <Button title="Scan" onPress={() => { }} />
                <Button title="Add Pet" onPress={() => { }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5DC',
        flexGrow: 1,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    tipTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tipContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        marginVertical: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});
