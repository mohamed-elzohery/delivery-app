import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Delivery App",
  description:
    "private delivery app for parcels. place your parcel and we will deliver it. we have more than 10 bikers available.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-poppins">{children}</body>
    </html>
  );
}
