import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function RedirectToLogin() {
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!rootNavigationState?.key) return;
        router.replace('/login')
    }, [rootNavigationState]);

    return null;
}
