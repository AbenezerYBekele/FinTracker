
import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

const CLERK_PUBLISHABLE_KEY = "pk_test_Y2FzdWFsLXR1cnRsZS0zNC5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout() {
    if (!CLERK_PUBLISHABLE_KEY) {
        throw new Error("Missing Clerk Publishable Key. Please set the CLERK_PUBLISHABLE_KEY variable.");
    }

    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            tokenCache={tokenCache}
        >
            <Slot />
        </ClerkProvider>
    );
}