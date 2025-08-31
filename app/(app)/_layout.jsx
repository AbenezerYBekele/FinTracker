import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import PageLoader from "../../components/PageLoader";

export default function AppLayout() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return <PageLoader />;
    }

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}