import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

type LoggedOutLayoutProps = {
  children: React.ReactNode;
};

export function LoggedOutLayout({ children }: LoggedOutLayoutProps) {
  return (
    <>
      <main
        className={`grid h-full w-full items-center bg-blue-50 px-2 ${inter.className} overflow-auto py-7`}
      >
        {children}
      </main>
      <Toaster />
    </>
  );
}
