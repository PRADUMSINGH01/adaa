import KurtiGrid from "@/components/KurtiGrid/KurtiGrid";
import Footer from "@/components/Footer/Footer";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import SlideNavbar from "@/components/SlideNavbar/SlideNabar";
import BottomNav from "@/components/Nav/BottomNav";
import ResponsiveImageGrid from "@/components/Banners/ResponsiveImageGrid";
import BannerSlider from "@/components/Banners/BannerSlider";
export default async function Home() {
  // const videoReviews = [
  //   {
  //     id: "1",
  //     url: "https://firebasestorage.googleapis.com/v0/b/adda-fa1b0.firebasestorage.app/o/13717274_2160_3840_32fps.mp4?alt=media&token=191a336c-fc89-438e-843d-65e1433cdc92",
  //     thumbnail: "/thumbnails/review1.jpg",
  //     user: "Sarah Johnson",
  //     date: "March 2024",
  //     rating: 4,
  //   },
  //   // Add more reviews...
  // ];
  return (
    <>
      <SlideNavbar />
      <div className="relative">
        <BannerSlider />
        <ResponsiveImageGrid />
      </div>
      <CategorySlider />

      <KurtiGrid />

      <Footer />
      <BottomNav />
    </>
  );
}
