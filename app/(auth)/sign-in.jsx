import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    TextInput,
    ScrollView,
    Text,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../../assets/style/auth.styles";

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const onSignInPress = async () => {
        if (!isLoaded || !emailAddress || !password) return;
        setLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/");
            }
        } catch (err) {
            Alert.alert(
                "Sign-in Error",
                err.errors?.[0]?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: COLORS.background }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: 40,
                    paddingHorizontal: 20,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Sign in to continue</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="mail-outline"
                                size={22}
                                color={COLORS.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                autoCapitalize="none"
                                value={emailAddress}
                                placeholder="Email Address"
                                onChangeText={setEmailAddress}
                                style={styles.input}
                                keyboardType="email-address"
                                editable={true}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={22}
                                color={COLORS.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={password}
                                placeholder="Password"
                                secureTextEntry={!isPasswordVisible}
                                onChangeText={setPassword}
                                style={styles.input}
                                editable={true}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!isPasswordVisible)}
                                style={styles.passwordVisibilityIcon}
                            >
                                <Ionicons
                                    name={
                                        isPasswordVisible ? "eye-off-outline" : "eye-outline"
                                    }
                                    size={22}
                                    color={COLORS.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={onSignInPress}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={COLORS.white} />
                        ) : (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => router.push("/sign-up")}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
