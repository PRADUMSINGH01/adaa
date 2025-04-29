import KurtiGrid from "@/components/KurtiGrid/KurtiGrid";
import Footer from "@/components/Footer/Footer";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SlideNavbar from "@/components/SlideNavbar/SlideNabar";
import BottomNav from "@/components/Nav/BottomNav";

export default async function Home() {



  return (
    <>
      <SlideNavbar />
      <CategorySlider />
      <KurtiGrid />

      <Footer />
      <BottomNav />
    </>
  );
}
