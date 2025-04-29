import { db } from './firebase/firebase';
import * as bcrypt from 'bcrypt';


interface User {
    email: string;
    password: string;
    name: string;
}

export async function registerUser(user: User): Promise<void> {
    const usersCollection = db.collection('Users');

    // Check if the user already exists
    const existingUser = await usersCollection.where('email', '==', user.email).get();
    if (!existingUser.empty) {
        throw new Error('User already exists');
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Save the user to Firestore
    await usersCollection.add({
        email: user.email,
        password: hashedPassword,
        name: user.name,
        createdAt: new Date(),Cart: [],
        address: [],});

    console.log('User registered successfully');
}