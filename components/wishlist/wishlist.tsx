"use client";

import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import Loading from "@/app/loading";
import { useUserData } from "@/components/Context/UserContext";

const UserWishlist: React.FC = () => {
  const { userData, loading } = useUserData();

  const removeItem = async (id: string) => {
    console.log(id);
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-neutral p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-light rounded-2xl shadow-xl overflow-hidden">
        <header className="flex items-center gap-3 px-6 py-4 border-b border-neutral">
          <FiHeart className="text-4xl text-primary" />
          <h1 className="font-playfair text-4xl font-bold text-dark">
            My Wishlist
          </h1>
        </header>

        <div className="p-6">
          {userData.wishlist.length === 0 ? (
            <p className="font-poppins text-secondary text-center">
              Your wishlist is empty.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-5 flex flex-col justify-between h-52">
                    <div>
                      <h2 className="font-poppins font-semibold text-lg text-dark truncate">
                        {item.name}
                      </h2>
                      <p className="mt-2 font-playfair text-xl text-primary">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => console.log(`Add to cart: ${item.id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg font-poppins hover:bg-primary/90 transition"
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserWishlist;
