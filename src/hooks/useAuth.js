import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return await signOut(auth);
    };

    return { user, loading, login, logout };
}
