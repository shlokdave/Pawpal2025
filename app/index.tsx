// app/index.tsx
import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';

export default function RedirectToHome() {
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();

    useEffect(() => {
        if (!rootNavigationState?.key) return;

        router.replace('/tabs/Home');
    }, [rootNavigationState]);

    return null;
}
