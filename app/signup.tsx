import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../config/firebaseConfig';

export default function SignUpScreen(): JSX.Element {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Account created successfully!');
            router.replace('/tabs/Home');
        } catch (error: any) {
            let message = 'Sign-up failed. Please try again.';
            if (error.code === 'auth/email-already-in-use') {
                message = 'That email is already in use.';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Invalid email address.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters.';
            }
            Alert.alert('Error', message);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>🐾 PawPal</Text>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.helper}>Join the PawPal family!</Text>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>


            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.signupPrompt}>
                Already have an account?{' '}
                <Text style={styles.signupLink} onPress={() => router.replace('/login')}>
                    Log in
                </Text>
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
