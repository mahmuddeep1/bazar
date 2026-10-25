"use client"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

interface Product {
    id: number
    image: string
    nameBn: string
    today: number
    unit: string
    category: string
    change: {
        dir: string
        pct: number
    };
}
const Cards = ({ product }: {product:Product}) => {
    const { data: session } = authClient.useSession()
    const isUp = product.change.dir === "up"

    const unitName =
        product.unit === "kg"
            ? "কেজি"
            : product.unit === "piece"
                ? "পিস"
                : product.unit === "liter"
                    ? "লিটার"
                    : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit;

    return (
         <Link
            href={
                session
                    ? `/products/${product.id}`
                    : `/signin?callbackURL=${encodeURIComponent(`/products/${product.id}`)}`
            }>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#f3f7f3] rounded-2xl flex items-center justify-center text-4xl">
                    {product.image}
                </div>

                <div>
                    <h2 className="text-lg font-bold">
                        {product.nameBn}
                    </h2>
                    <p className="text-sm text-gray-600">
                        প্রতি {unitName}
                    </p>
                </div>
            </div>

            <div className="flex justify-between items-end mt-6">
                <div>
                    <p className="text-base text-gray-700">
                        আজকের দাম
                    </p>
                    <p className="text-2xl font-extrabold">
                        {product.today.toLocaleString("bn-BD")} <span className="text-xl font-medium">টাকা</span>
                    </p>
                </div>

                <div className={`px-3 py-1 rounded-full font-semibold ${
                        isUp ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}>
                    {isUp ? "▲" : "▼"}{" "}
                    {product.change.pct.toLocaleString("bn-BD")}%
                </div>
            </div>

        </div>
        </Link>
    );
};

export default Cards;