import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, where, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirebaseCollection(collectionName, orderField = 'createdAt', orderDirection = 'desc', filters = []) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = useCallback(() => {
        const collectionRef = collection(db, collectionName);
        let constraints = [];

        // Add server-side filters if provided
        if (filters && Array.isArray(filters) && filters.length > 0) {
            filters.forEach(f => {
                if (f.field && f.operator && f.value !== undefined) {
                    constraints.push(where(f.field, f.operator, f.value));
                }
            });
        }

        // Add ordering
        if (orderField) {
            constraints.push(orderBy(orderField, orderDirection));
        }

        const q = query(collectionRef, ...constraints);

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
    }, [collectionName, orderField, orderDirection, JSON.stringify(filters)]);

    useEffect(() => {
        const unsubscribe = getData();
        return () => unsubscribe();
    }, [getData]);

    const addItem = async (itemData) => {
        try {
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

    /**
     * Updates multiple items in a single atomic batch.
     * @param {Array<{id: string, data: object}>} updates - Array of objects with id and data to update.
     */
    const updateMultipleItems = async (updates) => {
        try {
            const batch = writeBatch(db);
            updates.forEach(({ id, data }) => {
                const itemRef = doc(db, collectionName, id);
                batch.update(itemRef, data);
            });
            await batch.commit();
            return { success: true };
        } catch (error) {
            console.error(`Error batch updating in ${collectionName}:`, error);
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

    return { data, loading, error, addItem, updateItem, updateMultipleItems, deleteItem };
}
