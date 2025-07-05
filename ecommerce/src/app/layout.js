import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "360° Quick Scoops",
  description: "Premium ice cream delivered right to your door",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body
        className={`${poppins.variable} antialiased bg-pink-50`}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
