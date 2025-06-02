// app/kurties/[kurti]/page.tsx

import ProductGrid from "@/components/ProductGrid/ProductGrid";

type Params = Promise<{ Kurti: string }>;

export default async function Page({ params }: { params: Params }) {
  // unwrap the promise
  const { Kurti } = await params;
  const decodedKurti = decodeURIComponent(Kurti);

  return (
    <>
      <ProductGrid params={decodedKurti} />
    </>
  );
}
