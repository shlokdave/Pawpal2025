import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { firebaseApp } from '../../config/firebaseConfig';

export default function SettingsScreen() {
    const router = useRouter();
    const auth = getAuth(firebaseApp);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                router.replace('/login');
            })
            .catch((error) => {
                Alert.alert('Error', 'Could not log out. Please try again.');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>⚙️ Settings</Text>

            {/* General */}
            <Text style={styles.sectionHeader}>General</Text>
            <SettingsOption icon="notifications-outline" label="Manage Reminders" onPress={() => { }} />
            <SettingsOption icon="calendar-outline" label="Care Logs" onPress={() => { }} />

            {/* Account */}
            <Text style={styles.sectionHeader}>Account</Text>
            <SettingsOption icon="person-outline" label="Edit Profile" onPress={() => { }} />
            <SettingsOption icon="lock-closed-outline" label="Change Password" onPress={() => { }} />

            {/* Premium & Extras */}
            <Text style={styles.sectionHeader}>Premium Features</Text>
            <SettingsOption icon="star-outline" label="Upgrade to Premium" onPress={() => { }} />
            <SettingsOption icon="pricetags-outline" label="Redeem Promo Code" onPress={() => { }} />

            {/* Support */}
            <Text style={styles.sectionHeader}>Support</Text>
            <SettingsOption icon="help-circle-outline" label="FAQs & Help" onPress={() => { }} />
            <SettingsOption icon="mail-outline" label="Contact Support" onPress={() => { }} />

            {/* Logout */}
            <Text style={styles.sectionHeader}>Security</Text>
            <SettingsOption icon="log-out-outline" label="Log Out" onPress={handleLogout} danger />
        </ScrollView>
    );
}

function SettingsOption({ icon, label, onPress, danger = false }: {
    icon: any;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) {
    return (
        <TouchableOpacity style={styles.optionRow} onPress={onPress}>
            <Ionicons name={icon} size={22} color={danger ? '#B00020' : '#2D6063'} style={styles.optionIcon} />
            <Text style={[styles.optionText, danger && { color: '#B00020' }]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5DC',
        padding: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2D6063',
        marginBottom: 30,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#444',
        marginTop: 20,
        marginBottom: 10,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    optionIcon: {
        marginRight: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#2D6063',
    },
});
