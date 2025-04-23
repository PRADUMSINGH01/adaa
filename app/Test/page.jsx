"use server";
const page = async () => {
  const data = await fetch("https://zznccj-3000.csb.app/api/address/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        postalCode: "10001",
      },
    }),
  });

  return <>{data.status}</>;
};

export default page;
