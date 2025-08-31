import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { styles, COLORS } from "../../assets/style/auth.styles";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!emailAddress) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(emailAddress))
            newErrors.email = "Email is invalid";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 8)
            newErrors.password = "Password must be at least 8 characters";

        if (password !== confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSignUpPress = async () => {
        if (!validate()) return;
        if (!isLoaded) return;
        setLoading(true);

        try {
            const result = await signUp.create({ emailAddress, password });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.replace("/");
            }
        } catch (err) {
            Alert.alert(
                "Sign-up Error",
                err.errors?.[0]?.longMessage || "Something went wrong."
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
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, padding: 20 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Let's get you started</Text>
                    </View>

                    {/* Email Input */}
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
                                onChangeText={(text) => {
                                    setEmailAddress(text);
                                    if (errors.email) validate();
                                }}
                                style={styles.input}
                                keyboardType="email-address"
                                blurOnSubmit={false}
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Password Input */}
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
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errors.password) validate();
                                }}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                onPress={() => setPasswordVisible(!isPasswordVisible)}
                                style={styles.passwordVisibilityIcon}
                            >
                                <Ionicons
                                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                                    size={22}
                                    color={COLORS.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={22}
                                color={COLORS.secondary}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                secureTextEntry={!isConfirmPasswordVisible}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    if (errors.confirmPassword) validate();
                                }}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setConfirmPasswordVisible(!isConfirmPasswordVisible)
                                }
                                style={styles.passwordVisibilityIcon}
                            >
                                <Ionicons
                                    name={
                                        isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"
                                    }
                                    size={22}
                                    color={COLORS.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={onSignUpPress}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color={COLORS.white} />
                        ) : (
                            <Text style={styles.buttonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Footer Navigation */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push("/sign-in")}>
                            <Text style={styles.linkText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    );
}
