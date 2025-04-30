
import ProductGrid from "@/components/ProductGrid/ProductGrid";
const page = ({ params }: { params: { Kurti: string } }) => {



 return <>
  <ProductGrid />
{params.Kurti}
  
  </>
};

export default page;
