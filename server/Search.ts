type Product = {
    name: string;
    color?: string;
    fabric?: string;
    category: string;
  };
  
  const mockProducts: Product[] = [
    { name: "Blue Kurti", color: "blue", fabric: "cotton", category: "Kurties" },
    { name: "Red Kurti", color: "red", fabric: "silk", category: "Kurties" },
    { name: "Green Dress", color: "green", fabric: "linen", category: "Dresses" },
  ];
  
  export const searchKurties = async (filters: {
    color?: string;
    fabric?: string;
    name?: string;
  }): Promise<Product[]> => {
    try {
      const { color, fabric, name } = filters;
  
      const filtered = mockProducts.filter((product) => {
        if (product.category !== "Kurties") return false;
  
        const matchesColor = color
          ? product.color?.toLowerCase().includes(color.toLowerCase())
          : true;
  
        const matchesFabric = fabric
          ? product.fabric?.toLowerCase().includes(fabric.toLowerCase())
          : true;
  
        const matchesName = name
          ? product.name.toLowerCase().includes(name.toLowerCase())
          : true;
  
        return matchesColor && matchesFabric && matchesName;
      });
  
      return filtered;
    } catch (error) {
      throw new Error("An error occurred while searching for kurties.");
    }
  };
  