import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type LoggedOutLayoutProps = {
  children: React.ReactNode;
};

export function LoggedOutLayout({ children }: LoggedOutLayoutProps) {
  return (
    <main
      className={`grid h-full w-full items-center bg-neutral-100 px-2 ${inter.className} overflow-auto py-7`}
    >
      {children}
    </main>
  );
}
