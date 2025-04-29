import { db } from './firebase/firebase'; // Adjust the import path to your Firebase configuration

async function deleteAddress(userId: string, addressId: string): Promise<void> {
  try {
    const userDocRef = db.collection('Users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    if (!userData || !userData.addresses) {
      throw new Error('No addresses found for the user');
    }

    const updatedAddresses = userData.addresses.filter((address: any) => address.id !== addressId);

    await userDocRef.update({ addresses: updatedAddresses });
    console.log(`Address with ID ${addressId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
}

export default deleteAddress;