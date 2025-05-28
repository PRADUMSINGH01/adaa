import Wishlist from "@/components/wishlist/wishlist";
import AuthWrapper from "@/components/AuthWrap/AuthWrapper";
const page = () => {
  return (
    <AuthWrapper>
      <Wishlist />
    </AuthWrapper>
  );
};
export default page;
