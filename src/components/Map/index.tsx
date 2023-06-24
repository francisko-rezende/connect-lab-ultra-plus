import dynamic from "next/dynamic";

export const Map = dynamic(() => import('./Map').then(mod => mod.Map), { ssr: false })

