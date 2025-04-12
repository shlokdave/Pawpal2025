// config/firebaseConfig.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAB_LRMrfM5SKq13hmEpdTQvexHbqIDkMo",
    authDomain: "pawpal-4fd65.firebaseapp.com",
    projectId: "pawpal-4fd65",
    storageBucket: "pawpal-4fd65.appspot.com",
    messagingSenderId: "29551029532",
    appId: "1:29551029532:web:80de79e2c2dfd2ba999ed9",
};

export const firebaseApp = initializeApp(firebaseConfig);
