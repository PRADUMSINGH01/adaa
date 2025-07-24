"use client";
import { wishlist, Address } from "@/server/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of your user data
interface Order {
  userId: string;
  secureCode: number;
  amount: number;
  trackingId: string;
}
type UserDataType = {
  wishlist: wishlist[];
  Address: Address[];
  Orders: Order[];
};

type UserContextType = {
  userData: UserDataType;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserDataType>({
    wishlist: [],
    Address: [],
    Orders: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/GetUser");
      const result = res.json();
      return result.then((item) => setUserData(item));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();

    return;
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};
