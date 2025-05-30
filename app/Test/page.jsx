"use client";
import { useEffect } from "react";
const page = () => {
  useEffect(() => {
    fetch("https://j288sf-3000.csb.app/api/ProductByID/");
  });

  return <></>;
};

export default page;
