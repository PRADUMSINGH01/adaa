"use client";
import OrderSuccessAlert from "@/components/Alerts/OrderSuccessAlert";
const Completed = () => {
  return (
    <OrderSuccessAlert onContinueShopping={"/"} onViewOrders={"/Orders"} />
  );
};

export default Completed;
