import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirebaseCollection(collectionName, orderField = 'createdAt', orderDirection = 'desc') {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = useCallback(() => {
        let q;
        if (orderField) {
            q = query(collection(db, collectionName), orderBy(orderField, orderDirection));
        } else {
            q = query(collection(db, collectionName));
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const itemsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(itemsData);
            setLoading(false);
        }, (err) => {
            console.error(`Error fetching ${collectionName}:`, err);
            setError(err);
            setLoading(false);
        });

        return unsubscribe;
    }, [collectionName, orderField, orderDirection]);

    useEffect(() => {
        const unsubscribe = getData();
        return () => unsubscribe();
    }, [getData]);

    const addItem = async (itemData) => {
        try {
            // Support backward compatibility where flavors/menus injected isAvailable automatically
            const payload = typeof itemData === 'string' ? { name: itemData } : itemData;
            const isMenuOrFlavor = collectionName === 'flavors' || collectionName === 'menu_items';
            
            let finalData = { ...payload, createdAt: serverTimestamp() };
            if (isMenuOrFlavor && finalData.isAvailable === undefined) {
                finalData.isAvailable = true;
            }

            const docRef = await addDoc(collection(db, collectionName), finalData);
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error(`Error adding to ${collectionName}:`, error);
            return { success: false, error };
        }
    };

    const updateItem = async (id, updatedData) => {
        try {
            const payload = typeof updatedData === 'string' ? { name: updatedData } : updatedData;
            const itemRef = doc(db, collectionName, id);
            await updateDoc(itemRef, payload);
            return { success: true };
        } catch (error) {
            console.error(`Error updating in ${collectionName}:`, error);
            return { success: false, error };
        }
    };

    const deleteItem = async (id) => {
        try {
            const itemRef = doc(db, collectionName, id);
            await deleteDoc(itemRef);
            return { success: true };
        } catch (error) {
            console.error(`Error deleting from ${collectionName}:`, error);
            return { success: false, error };
        }
    };

    return { data, loading, error, addItem, updateItem, deleteItem };
}
