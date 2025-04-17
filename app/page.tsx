import KurtiGrid from "@/components/KurtiGrid/KurtiGrid";
import Footer from "@/components/Footer/Footer";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SlideNavbar from "@/components/SlideNavbar/SlideNabar";
export default function Home() {
  return (
    <>
      <SlideNavbar />
      <CategorySlider />
      <KurtiGrid />

      <Footer />
    </>
  );
}
