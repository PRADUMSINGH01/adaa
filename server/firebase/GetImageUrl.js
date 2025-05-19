import { storage } from "./firebase";
export default async function GetImageURL() {
  const [file] = await storage.bucket().file("images/example.jpg").get();
  const signedUrl = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2025", // Set appropriate expiration
  });

  return json({ url: signedUrl[0] });
}
