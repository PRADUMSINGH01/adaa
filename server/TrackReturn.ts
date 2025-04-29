import {db} from '@/server/firebase/firebase'
export async function fetchTrackOrder(orderId: string): Promise<any> {
    try {
        const orderRef = db.collection('orders').doc(orderId);
        const orderDoc = await orderRef.get();

        if (!orderDoc.exists) {
            throw new Error(`Order with ID ${orderId} does not exist.`);
        }

        return orderDoc.data();
    } catch (error) {
        console.error('Error fetching track order:', error);
        throw error;
    }
}