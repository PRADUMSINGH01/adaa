import ProductPage from "@/components/FullProduct/FullProduct";
import ProductFilters from "@/components/Filter/Filter";

const page = () => {
  return (
    <div className="flex w-full justify-between">
      <ProductFilters />
      <ProductPage />
    </div>
  );
};

export default page;
