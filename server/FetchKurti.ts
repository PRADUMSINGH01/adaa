import { db } from './firebase/firebase' ;

export  async function fetchLatestKurties() {
    try {
        const productsCollection = db.collection('Products');
            
        const querySnapshot = await productsCollection.get();
        const kurties = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        console.log('Fetched Kurties:', kurties);
        return kurties;
    } catch (error) {
        console.error('Error fetching kurties:', error);
        throw error;
    }
}