"use client";
import { useEffect } from "react";
const page = () => {
  useEffect(() => {
    fetch("/api/Addkurti/");
  });

  return <></>;
};

export default page;
