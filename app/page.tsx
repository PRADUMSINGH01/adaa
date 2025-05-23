import KurtiGrid from "@/components/KurtiGrid/KurtiGrid";
import Footer from "@/components/Footer/Footer";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SlideNavbar from "@/components/SlideNavbar/SlideNabar";
import BottomNav from "@/components/Nav/BottomNav";
import ResponsiveImageGrid from "@/components/Banners/ResponsiveImageGrid";

import BannerSlider from "@/components/Banners/BannerSlider";
export default async function Home() {
  return (
    <>
      <SlideNavbar />
      <BannerSlider />
      <ResponsiveImageGrid />
      <CategorySlider />

      <KurtiGrid />
      <Footer />
      <BottomNav />
    </>
  );
}
