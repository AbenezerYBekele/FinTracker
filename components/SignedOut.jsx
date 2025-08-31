// File: components/SignOutButton.jsx

import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../assets/style/home.styles'; // Make sure this path is correct and has a "Button" style

// This is a named export. It must be imported with { SignOutButton }
export const SignOutButton = () => {
    // useAuth is the hook to access the signOut function
    const { isLoaded, signOut } = useAuth();

    if (!isLoaded) {
        // You can return null or a placeholder if the auth state is not ready
        return null;
    }

    const handleSignOut = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    // The signOut function from Clerk handles all the logic
                    onPress: () => signOut(),
                },
            ]
        );
    };

    return (
        // The styles.Button should define the look of your button
        <TouchableOpacity style={styles.Button} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#FFF" />
        </TouchableOpacity>
    );
};