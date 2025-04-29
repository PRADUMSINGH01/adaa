type Product = {
    id: string;
    name: string;
    price: number;
  };
  
  type Wishlist = {
    id: string;
    products: Product[];
  };
  
  function ensureWishlistsExist(initialWishlistId: string) {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem("wishlists")) {
      const initial: Wishlist[] = [{ id: initialWishlistId, products: [] }];
      localStorage.setItem("wishlists", JSON.stringify(initial));
    }
  }
  
  export function addProductToWishlist(product: Product, wishlistId: string): void {
    ensureWishlistsExist(wishlistId);
  
    const wishlists: Wishlist[] = JSON.parse(
      localStorage.getItem("wishlists")!
    );
  
    let wishlist = wishlists.find(w => w.id === wishlistId);
    if (!wishlist) {
      wishlist = { id: wishlistId, products: [] };
      wishlists.push(wishlist);
    }
  
    const alreadyThere = wishlist.products.some(p => p.id === product.id);
    if (!alreadyThere) {
      wishlist.products.push(product);
      localStorage.setItem("wishlists", JSON.stringify(wishlists));
    }
  }
  