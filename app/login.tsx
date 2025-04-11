import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const router = useRouter();

    const handleLogin = () => {
        // Add auth check here if needed
        router.replace('/tabs/Home'); // ✅ Go to app after login
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>🐾 PawPal</Text>
            <Text style={styles.title}>Welcome to PawPal</Text>
            <Text style={styles.subtitle}>Login</Text>
            <Text style={styles.helper}>Please sign in to continue</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    secureTextEntry={secureText}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Text style={styles.showButton}>{secureText ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.signupPrompt}>
                New user? <Text style={styles.signupLink}>Sign up</Text>
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
    },
    helper: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    showButton: {
        color: '#007BFF',
        paddingHorizontal: 8,
    },
    loginButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    signupPrompt: {
        textAlign: 'center',
        fontSize: 14,
    },
    signupLink: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
