import "./globals.css";
import { Inter, Poppins, Montserrat } from "next/font/google";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata = {
  title: "Logger",
  description:
    "Logger is your partner for counting visitors with ease, offering insights without intrusion.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-grey-50`}>{children}</body>
    </html>
  );
}
