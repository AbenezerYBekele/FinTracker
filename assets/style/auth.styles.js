import { StyleSheet } from 'react-native';

export const COLORS = {
    primary: '#007BFF',
    secondary: '#6C757D',
    background: '#F8F9FA',
    text: '#343A40',
    textLight: '#6C757D',
    white: '#FFFFFF',
    error: '#DC3545',
    success: '#28A745',
    border: '#CED4DA',
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        padding: 24,
    },
    // Header section with title and subtitle
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    // Input fields and error messages
    inputContainer: {
        marginBottom: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: COLORS.text,
    },
    inputFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
    },
    // Password-specific styles
    passwordVisibilityIcon: {
        padding: 6,
    },
    // Main action button
    button: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: COLORS.secondary,
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Footer section for navigation
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    linkText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginLeft: 6,
    },
});