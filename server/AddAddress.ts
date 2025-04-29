// server/addAddressToUser.ts
import firebase from 'firebase/compat/app';  
import 'firebase/compat/firestore';
import { db } from './firebase/firebase';  

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export async function addAddressToUser(
  userId: string,
  address: Address
): Promise<void> {
  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.update({
      // FieldValue.arrayUnion for v8
      addresses: firebase.firestore.FieldValue.arrayUnion(address),
    });

    console.log(`Address added successfully for user: ${userId}`);
  } catch (err) {
    console.error(`Failed to add address for user: ${userId}`, err);
    throw new Error('Could not add address to user');
  }
}
