import { RetainQueryLink } from "@/components/RetainQueryLink";
import { TextField } from "@/components/TextField";
import { useLoadSelectedLocationFromQuery } from "@/hooks/useLoadSelectedLocationFromQuery";
import { trpc } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

type LoggedInLayoutProps = {
  children: React.ReactNode;
};

export function LoggedInLayout({ children }: LoggedInLayoutProps) {
  const router = useRouter();
  const loggedInCompanyQuery = trpc.me.useQuery();
  const [selectedLocationId, setSelectedLocationId] = useState(0);
  const { data: company } = loggedInCompanyQuery;
  const locationsQuery = trpc.getLocations.useQuery();
  const { data: locationsData } = locationsQuery;
  useLoadSelectedLocationFromQuery({ locationsData, setSelectedLocationId });

  const getLinkClasses = (linkHref: string) =>
    router.pathname === linkHref
      ? "font-semibold text-blue-700"
      : "font-medium text-stone-700";

  const handleSelectedLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLocationId = parseInt(e.target.value);
    router.replace({ query: { locationId: selectedLocationId } });
    setSelectedLocationId(selectedLocationId);
  };

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
    });
    router.push(data.url);
  };

  const linksData = [
    { href: "/", children: "Overview" },
    { href: "/sensores", children: "Sensores" },
    { href: "/locais", children: "Locais" },
    { href: "/configuracoes", children: "Configurações" },
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
          <TextField.Select
            value={selectedLocationId}
            hasError={false}
            className="w-auto"
            onChange={handleSelectedLocationChange}
          >
            <option value={0} disabled>
              Selecione um local
            </option>
            {locationsData?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </TextField.Select>
        </div>
      </header>
      <nav className="relative z-0 col-span-1 h-full max-w-[390px] content-baseline bg-gray-50 pl-16 pr-6 pt-12">
        <h2 className="mb-20 text-xl font-semibold">{company?.companyName}</h2>
        <h3 className="-ml-8 mb-10 uppercase text-gray-500">Menu</h3>
        <ul className="grid gap-10">
          {linksData.map(({ href, children }) => {
            return (
              <li key={href}>
                <RetainQueryLink className={getLinkClasses(href)} href={href}>
                  {children}
                </RetainQueryLink>
              </li>
            );
          })}
        </ul>
        <a
          className="absolute bottom-24 cursor-pointer"
          onClick={handleSignOut}
        >
          Logout
        </a>
      </nav>
      <main className={`col-span-1 h-full w-full overflow-auto px-8 py-12`}>
        {children}
      </main>
      <Toaster position="bottom-center" />
    </div>
  );
}
