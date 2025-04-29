import {db} from '@/server/firebase/firebase'

interface CartItem {
    productId: string;
    quantity: number;
}

export  async function addToCart(userId: string, item: CartItem): Promise<void> {
    try {
        const cartRef = db.collection('/Users/zJkrnsdL5481VfMPwEfe/Cart').doc(userId);
        const cartDoc = await cartRef.get();

        if (cartDoc.exists) {
            const cartData = cartDoc.data();
            const existingItems: CartItem[] = cartData?.items || [];

            const itemIndex = existingItems.findIndex(
                (existingItem) => existingItem.productId === item.productId
            );

            if (itemIndex > -1) {
                // Update quantity if item already exists
                existingItems[itemIndex].quantity += item.quantity;
            } else {
                // Add new item to the cart
                existingItems.push(item);
            }

            await cartRef.update({ items: existingItems });
        } else {
            // Create a new cart for the user
            await cartRef.set({ items: [item] });
        }

        console.log('Item added to cart successfully.');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw new Error('Failed to add item to cart.');
    }
}

