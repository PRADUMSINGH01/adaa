import KurtiGrid from "@/components/KurtiGrid/KurtiGrid";
import Footer from "@/components/Footer/Footer";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SlideNavbar from "@/components/SlideNavbar/SlideNabar";
import BottomNav from "@/components/Nav/BottomNav";

import KurtiCard from "@/components/KurtiGrid/CategoryProducts";
export default async function Home() {
  return (
    <>
      <SlideNavbar />
      <CategorySlider />
      <KurtiGrid />
      <div className="flex flex-col w-full p-2 bg-neutral">
        <h1 className="font-playfair text-2xl text-dark font-bold  text-center py-2">
          Co-Ord Set{" "}
        </h1>
        <div className="flex  flex-wrap w-full p-2 bg-neutral">
          <KurtiCard
            title="Floral Printed Cotton Kurti"
            price={1499}
            category="Casual Wear"
            isWishlisted={false}
          />
          <KurtiCard
            title="Floral Printed Cotton Kurti"
            price={1499}
            category="Casual Wear"
            isWishlisted={false}
          />
          <KurtiCard
            title="Floral Printed Cotton Kurti"
            price={1499}
            category="Casual Wear"
            isWishlisted={false}
          />
        </div>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}
