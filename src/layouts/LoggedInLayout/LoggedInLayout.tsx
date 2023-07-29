import { TextField } from "@/components/TextField";
import { trpc } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

type LoggedInLayoutProps = {
  children: React.ReactNode;
};

export function LoggedInLayout({ children }: LoggedInLayoutProps) {
  const router = useRouter();
  const loggedInCompanyQuery = trpc.me.useQuery();
  const { data } = loggedInCompanyQuery;

  const getLinkClasses = (linkHref: string) =>
    router.pathname === linkHref
      ? "font-semibold text-blue-700"
      : "font-medium text-stone-700";

  const locations = [
    {
      value: "1",
      label: "Campo de soja",
    },
    {
      value: "2",
      label: "Campo de milho",
    },
    {
      value: "3",
      label: "Campo de abóbora",
    },
  ];

  return (
    <div
      className={`${inter.className} grid h-full grid-cols-[1fr_3fr] grid-rows-[auto_1fr] 2xl:grid-cols-[390px_1fr]`}
    >
      <header className="relative z-10 col-span-2 px-16 py-9 shadow-lg">
        <div className="flex max-w-[1373px] items-center justify-between gap-4">
          <Link href="/">
            {" "}
            <h1 className="inline text-2xl font-semibold uppercase">
              Connect Lab
            </h1>
          </Link>
          <TextField.Select hasError={false} className="w-auto">
            {locations.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </TextField.Select>
        </div>
      </header>
      <nav className="relative z-0 col-span-1 h-full max-w-[390px] content-baseline bg-gray-50 pl-16 pr-6 pt-12">
        <h2 className="mb-20 text-xl font-semibold">{data?.companyName}</h2>
        <h3 className="-ml-8 mb-10 uppercase text-gray-500">Menu</h3>
        <ul className="grid gap-10">
          <li>
            <Link className={getLinkClasses("/")} href="/">
              Overview
            </Link>
          </li>
          <li>
            <Link className={getLinkClasses("/sensores")} href="/sensores">
              Sensores
            </Link>
          </li>
          <li>
            <Link className={getLinkClasses("/locais")} href="/locais">
              Locais
            </Link>
          </li>
          <li>
            <Link
              className={getLinkClasses("/configuracoes")}
              href="/configuracoes"
            >
              Configurações
            </Link>
          </li>
        </ul>
        <a
          className="absolute bottom-24 cursor-pointer"
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: "/login",
            });
            router.push(data.url);
          }}
        >
          Logout
        </a>
      </nav>
      <main className={`col-span-1 h-full w-full overflow-auto px-8 py-12`}>
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
