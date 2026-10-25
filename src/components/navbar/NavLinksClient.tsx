"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Navs {
    id: string;
    slug: string;
    icon: string;
    nameBn: string;
    url: string;
}
interface Props {
    data: Navs[]
}
const NavLinksClient = ({ data }: Props) => {
    const pathname = usePathname();

    return (
        <div className="flex md:gap-3 border border-gray-200 px-2 md:px-20 py-3 text-sm overflow-x-auto shrink-0 no-scrollbar md:justify-center items-center whitespace-nowrap">
            {data.map((n) => {
                const isActive = pathname === `/categories/${n.id}`;

                return (
                    <Link href={`/categories/${n.id}`}
                        key={n.id}
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 md:px-2 md:py-2 text-base md:text-sm font-bold transition-colors ${isActive
                                ? "bg-[#07883e] text-white"
                                : "bg-transparent text-gray-800 hover:bg-green-50"}`}>
                        <span className="text-xl">{n.icon}</span>
                        <span>{n.nameBn}</span>
                    </Link>
                )})}
        </div>
    )
}

export default NavLinksClient